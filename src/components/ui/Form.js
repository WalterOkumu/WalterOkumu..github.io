'use client';

import React, { forwardRef, useState, useId } from 'react';
import { cn } from '@/lib/utils';
import { sanitizeFormData, validateSanitizedData } from '@/lib/sanitize';
import Button from './Button';

/**
 * Professional Form Components
 * For contact forms and professional inquiries
 */

// Form Field Component
const FormField = forwardRef(({
  label,
  error,
  required = false,
  children,
  className = '',
  id,
  ...props
}, ref) => {
  const reactId = useId();
  const fieldId = id || `field-${reactId}`;
  const errorId = error ? `${fieldId}-error` : undefined;
  const describedBy = error ? errorId : undefined;

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {label && (
        <label
          htmlFor={fieldId}
          className="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
        >
          {label}
          {required && <span className="text-error-DEFAULT ml-1" aria-label="required">*</span>}
        </label>
      )}
      {React.cloneElement(children, {
        id: fieldId,
        'aria-describedby': describedBy,
        'aria-invalid': error ? 'true' : 'false',
      })}
      {error && (
        <p
          id={errorId}
          className="text-sm text-error-DEFAULT"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </div>
  );
});

// Input Component
const Input = forwardRef(({
  className = '',
  type = 'text',
  error = false,
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        'w-full px-4 py-3 rounded-lg border transition-colors duration-200',
        'bg-white dark:bg-neutral-900',
        'text-neutral-900 dark:text-neutral-100',
        'placeholder-neutral-500 dark:placeholder-neutral-400',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        error
          ? 'border-error-DEFAULT focus:border-error-DEFAULT'
          : 'border-neutral-300 dark:border-neutral-700 focus:border-primary-500',
        className
      )}
      {...props}
    />
  );
});

// Textarea Component
const Textarea = forwardRef(({
  className = '',
  error = false,
  rows = 4,
  ...props
}, ref) => {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(
        'w-full px-4 py-3 rounded-lg border transition-colors duration-200 resize-none',
        'bg-white dark:bg-neutral-900',
        'text-neutral-900 dark:text-neutral-100',
        'placeholder-neutral-500 dark:placeholder-neutral-400',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        error
          ? 'border-error-DEFAULT focus:border-error-DEFAULT'
          : 'border-neutral-300 dark:border-neutral-700 focus:border-primary-500',
        className
      )}
      {...props}
    />
  );
});

// Select Component
const Select = forwardRef(({
  className = '',
  error = false,
  children,
  ...props
}, ref) => {
  return (
    <select
      ref={ref}
      className={cn(
        'w-full px-4 py-3 rounded-lg border transition-colors duration-200 bg-white dark:bg-neutral-900',
        'text-neutral-900 dark:text-neutral-100',
        'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
        error
          ? 'border-error-DEFAULT focus:border-error-DEFAULT'
          : 'border-neutral-300 dark:border-neutral-700 focus:border-primary-500',
        className
      )}
      {...props}
    >
      {children}
    </select>
  );
});

// Professional Contact Form Component
const ContactForm = forwardRef(({
  onSubmit,
  className = '',
  ...props
}, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: '',
    subject: '',
    message: '',
    timeline: '',
    budget: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType = 'Please select an inquiry type';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // First validate the raw form data
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('');

    try {
      // Sanitize the form data before sending
      const sanitizedData = sanitizeFormData(formData);
      
      // Validate sanitized data
      const sanitizationResult = validateSanitizedData(sanitizedData);
      if (!sanitizationResult.isValid) {
        setErrors(sanitizationResult.errors);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sanitizedData,
          // Add security metadata
          _timestamp: new Date().toISOString(),
          _sanitized: true
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        company: '',
        inquiryType: '',
        subject: '',
        message: '',
        timeline: '',
        budget: ''
      });

      if (onSubmit) {
        onSubmit(sanitizedData); // Pass sanitized data to callback
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inquiryTypes = [
    { value: '', label: 'Select inquiry type' },
    { value: 'executive-opportunity', label: 'Executive Opportunity' },
    { value: 'consulting', label: 'Consulting & Advisory' },
    { value: 'speaking', label: 'Speaking Engagement' },
    { value: 'collaboration', label: 'Technical Collaboration' },
    { value: 'mentoring', label: 'Mentoring & Coaching' },
    { value: 'other', label: 'Other Professional Inquiry' }
  ];

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
      noValidate
      aria-label="Professional contact form"
      {...props}
    >
      {/* Form Status Announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {submitStatus === 'success' && 'Form submitted successfully. Thank you for your inquiry!'}
        {submitStatus === 'error' && 'Form submission failed. Please review and try again.'}
        {isSubmitting && 'Form is being submitted. Please wait.'}
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div
          className="p-4 bg-success-light/10 border border-success-light/20 rounded-lg"
          role="alert"
          aria-label="Success message"
        >
          <p className="text-success-dark font-medium">
            <svg
              className="inline w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            Thank you for your inquiry! I&apos;ll respond within {process.env.NEXT_PUBLIC_RESPONSE_TIME || '24 hours'}.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div
          className="p-4 bg-error-light/10 border border-error-light/20 rounded-lg"
          role="alert"
          aria-label="Error message"
        >
          <p className="text-error-dark font-medium">
            <svg
              className="inline w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            There was an error sending your message. Please try again.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <FormField label="Full Name" error={errors.name} required>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your full name"
            error={!!errors.name}
            required
          />
        </FormField>

        {/* Email */}
        <FormField label="Email Address" error={errors.email} required>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your.email@company.com"
            error={!!errors.email}
            required
          />
        </FormField>

        {/* Company */}
        <FormField label="Company/Organization">
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Your company or organization"
          />
        </FormField>

        {/* Inquiry Type */}
        <FormField label="Inquiry Type" error={errors.inquiryType} required>
          <Select
            name="inquiryType"
            value={formData.inquiryType}
            onChange={handleChange}
            error={!!errors.inquiryType}
            required
          >
            {inquiryTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

      {/* Subject */}
      <FormField label="Subject" error={errors.subject} required>
        <Input
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Brief subject line for your inquiry"
          error={!!errors.subject}
          required
        />
      </FormField>

      {/* Message */}
      <FormField label="Message" error={errors.message} required>
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Please provide details about your inquiry, including any specific requirements, timeline, or questions you may have..."
          rows={6}
          error={!!errors.message}
          required
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Timeline */}
        <FormField label="Project Timeline">
          <Select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
          >
            <option value="">Select timeline (optional)</option>
            <option value="immediate">Immediate (Within 1 month)</option>
            <option value="short-term">Short-term (1-3 months)</option>
            <option value="medium-term">Medium-term (3-6 months)</option>
            <option value="long-term">Long-term (6+ months)</option>
            <option value="flexible">Flexible/Ongoing</option>
          </Select>
        </FormField>

        {/* Budget Range */}
        <FormField label="Budget Range">
          <Select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
          >
            <option value="">Select budget range (optional)</option>
            <option value="consulting">Consulting Rate Discussion</option>
            <option value="executive">Executive Compensation Package</option>
            <option value="project">Project-Based Pricing</option>
            <option value="retainer">Monthly Retainer</option>
            <option value="discuss">Prefer to Discuss</option>
          </Select>
        </FormField>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          size="lg"
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full md:w-auto"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Professional Inquiry'}
        </Button>
      </div>
    </form>
  );
});

// Set display names
FormField.displayName = 'FormField';
Input.displayName = 'Input';
Textarea.displayName = 'Textarea';
Select.displayName = 'Select';
ContactForm.displayName = 'ContactForm';

export { FormField, Input, Textarea, Select, ContactForm };
export default ContactForm;