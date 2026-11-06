/**
 * Real LinkedIn recommendations only.
 * The Testimonials section stays hidden while this list is empty.
 *
 * Example:
 * {
 *   quote: 'Exact words from the recommendation.',
 *   name: 'Full name',
 *   role: 'Their title, Company',
 *   relationship: 'Managed Hamza directly',
 *   source: 'https://www.linkedin.com/in/…/details/recommendations/',
 * }
 */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  relationship?: string;
  source: string;
}

export const testimonials: Testimonial[] = [];
