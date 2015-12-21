export const Plans = [{
  id: 1,
  code: 'free',
  displayName: 'Free',
  stripe_plan_id: undefined,
  monthly_cost: 0,
  max_forms: 1,
  max_field_count: 10,
  max_submissions_per_month: 100,
  allow_csv_export: false,
  allow_webhooks: false,
  allow_file_uploads: false,
  max_submissions_mb: 0
}, {
  id: 2,
  code: 'pro',
  displayName: 'Pro',
  stripe_plan_id: 'fb-pro',
  monthly_cost: 1,
  max_forms: 1,
  max_field_count: 100,
  max_submissions_per_month: Infinity,
  allow_csv_export: true,
  allow_webhooks: false,
  allow_file_uploads: false,
  max_submissions_mb: 1
}, {
  id: 3,
  code: 'startup',
  displayName: 'Startup',
  stripe_plan_id: 'fb-startup',
  monthly_cost: 24,
  max_forms: 10,
  max_field_count: 1000,
  max_submissions_per_month: Infinity,
  allow_csv_export: true,
  allow_webhooks: true,
  allow_file_uploads: true,
  max_submissions_mb: 2
}, {
  id: 4,
  code: 'enterprise',
  displayName: 'Enterprise',
  stripe_plan_id: 'fb-enterprise',
  monthly_cost: 99,
  max_forms: 500,
  max_field_count: Infinity,
  max_submissions_per_month: Infinity,
  allow_csv_export: true,
  allow_webhooks: true,
  allow_file_uploads: true,
  max_submissions_mb: 10
}]
