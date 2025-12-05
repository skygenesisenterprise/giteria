"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/app/components/ui/Button";
import { Input } from "@/app/components/ui/Input";
import { Card, CardContent, CardHeader } from "@/app/components/ui/Card";
import { Alert } from "@/app/components/ui/Alert";
import { SocialAuth } from "./components/SocialAuth";
import { FeatureList } from "./components/FeatureList";

interface FormData {
  email: string;
  password: string;
  username: string;
  country: string;
  termsAccepted: boolean;
  marketingEmails: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
  username?: string;
  country?: string;
  termsAccepted?: string;
  general?: string;
}

export default function RegisterClient() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    username: "",
    country: "",
    termsAccepted: false,
    marketingEmails: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const countries = [
    { value: "", label: "Select Country/Region" },
    { value: "US", label: "United States" },
    { value: "GB", label: "United Kingdom" },
    { value: "CA", label: "Canada" },
    { value: "AU", label: "Australia" },
    { value: "DE", label: "Germany" },
    { value: "FR", label: "France" },
    { value: "JP", label: "Japan" },
    { value: "CN", label: "China" },
    { value: "IN", label: "India" },
    { value: "BR", label: "Brazil" },
    { value: "MX", label: "Mexico" },
    { value: "ES", label: "Spain" },
    { value: "IT", label: "Italy" },
    { value: "KR", label: "South Korea" },
    { value: "NL", label: "Netherlands" },
    { value: "SE", label: "Sweden" },
    { value: "NO", label: "Norway" },
    { value: "DK", label: "Denmark" },
    { value: "FI", label: "Finland" },
    { value: "CH", label: "Switzerland" },
    { value: "AT", label: "Austria" },
    { value: "BE", label: "Belgium" },
    { value: "IE", label: "Ireland" },
    { value: "PT", label: "Portugal" },
    { value: "GR", label: "Greece" },
    { value: "PL", label: "Poland" },
    { value: "CZ", label: "Czech Republic" },
    { value: "HU", label: "Hungary" },
    { value: "RO", label: "Romania" },
    { value: "RU", label: "Russia" },
    { value: "UA", label: "Ukraine" },
    { value: "TR", label: "Turkey" },
    { value: "IL", label: "Israel" },
    { value: "SA", label: "Saudi Arabia" },
    { value: "AE", label: "United Arab Emirates" },
    { value: "ZA", label: "South Africa" },
    { value: "EG", label: "Egypt" },
    { value: "NG", label: "Nigeria" },
    { value: "KE", label: "Kenya" },
    { value: "AR", label: "Argentina" },
    { value: "CL", label: "Chile" },
    { value: "CO", label: "Colombia" },
    { value: "PE", label: "Peru" },
    { value: "VE", label: "Venezuela" },
    { value: "TH", label: "Thailand" },
    { value: "SG", label: "Singapore" },
    { value: "MY", label: "Malaysia" },
    { value: "PH", label: "Philippines" },
    { value: "ID", label: "Indonesia" },
    { value: "VN", label: "Vietnam" },
    { value: "NZ", label: "New Zealand" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      formData.password.length < 15 &&
      (formData.password.length < 8 || !/\d/.test(formData.password) || !/[a-z]/.test(formData.password))
    ) {
      newErrors.password = "Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter";
    }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/.test(formData.username)) {
      newErrors.username = "Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    } else if (formData.username.length > 39) {
      newErrors.username = "Username must be less than 40 characters long";
    }

    // Country validation
    if (!formData.country) {
      newErrors.country = "Country/Region is required";
    }

    // Terms validation
    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept Terms of Service";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev: FormData) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev: FormErrors) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          setErrors(data.errors);
        } else {
          setErrors({ general: data.message || 'Registration failed. Please try again.' });
        }
        return;
      }

      setSuccess(true);
      // Redirect to dashboard or email verification page after 2 seconds
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 2000);

    } catch (error) {
      setErrors({ general: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialAuth = (provider: string) => {
    // Redirect to OAuth provider
    window.location.href = `/api/auth/${provider}`;
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account created successfully!</h2>
            <p className="text-gray-600 mb-4">Redirecting to your dashboard...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center mr-2">
                <span className="text-white font-bold text-sm">G</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Giteria</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Already have an account?</span>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign in →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Marketing Content */}
          <div className="hidden lg:block">
            <FeatureList />
            <div className="mt-8">
              <img 
                src="/api/placeholder/600/400" 
                alt="Giteria Platform Illustration"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>

          {/* Right Column - Registration Form */}
          <div className="lg:max-w-md">
            <Card>
              <CardHeader>
                <h1 className="text-2xl font-bold text-gray-900 text-center">
                  Sign up for Giteria
                </h1>
              </CardHeader>
              <CardContent>
                {/* General Error Alert */}
                {errors.general && (
                  <div className="mb-6">
                    <Alert 
                      type="error" 
                      message={errors.general}
                    />
                  </div>
                )}

                {/* Social Authentication */}
                <div className="mb-6">
                  <SocialAuth
                    onGoogleClick={() => handleSocialAuth('google')}
                    onAppleClick={() => handleSocialAuth('apple')}
                    onGitHubClick={() => handleSocialAuth('github')}
                  />
                </div>

                {/* Divider */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">or</span>
                  </div>
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    type="email"
                    label="Email*"
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    error={errors.email}
                    required
                  />

                  <Input
                    type="password"
                    label="Password*"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    error={errors.password}
                    helper="Password should be at least 15 characters OR at least 8 characters including a number and a lowercase letter."
                    required
                  />

                  <Input
                    type="text"
                    label="Username*"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    error={errors.username}
                    helper="Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen."
                    required
                  />

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-900">
                      Your Country/Region*
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        errors.country ? 'border-red-300' : 'border-gray-300'
                      }`}
                      required
                    >
                      {countries.map((country) => (
                        <option key={country.value} value={country.value}>
                          {country.label}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="text-sm text-red-600">{errors.country}</p>
                    )}
                  </div>

                  {/* Email Preferences */}
                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.marketingEmails}
                        onChange={(e) => handleInputChange('marketingEmails', e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Receive occasional product updates and announcements
                      </span>
                    </label>

                    <label className="flex items-start">
                      <input
                        type="checkbox"
                        checked={formData.termsAccepted}
                        onChange={(e) => handleInputChange('termsAccepted', e.target.checked)}
                        className={`w-4 h-4 mt-0.5 border-gray-300 rounded focus:ring-blue-500 ${
                          errors.termsAccepted ? 'border-red-300' : ''
                        }`}
                        required
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        By creating an account, you agree to{' '}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                          Terms of Service
                        </Link>
                        . For more information about Giteria's privacy practices, see{' '}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                          Giteria Privacy Statement
                        </Link>
                        . We'll occasionally send you account-related emails.
                      </span>
                    </label>
                    {errors.termsAccepted && (
                      <p className="text-sm text-red-600">{errors.termsAccepted}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create account'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Mobile Feature List */}
            <div className="lg:hidden mt-8">
              <FeatureList />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2025 Giteria, Inc. All rights reserved.</p>
            <div className="mt-2 space-x-4">
              <Link href="/terms" className="hover:text-gray-900">Terms</Link>
              <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
              <Link href="/security" className="hover:text-gray-900">Security</Link>
              <Link href="/status" className="hover:text-gray-900">Status</Link>
              <Link href="/docs" className="hover:text-gray-900">Docs</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}