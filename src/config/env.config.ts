export type EnvironmentConfig = {
  host: string;
  environment: string;
  auth: {
    issuer: string;
    secret: string;
  };
  email: {
    fromName: string;
    fromEmail: string;
    disabled: boolean;
    apiKey?: string;
  };
  gcs: {
    url: string;
  };
  stripe: {
    apiKey: string;
    checkoutWebhookSecret: string;
  };
};

const env: EnvironmentConfig = {
  host: process.env.APP_URL || 'http://localhost:3000',
  environment: process.env.ENVIRONMENT ?? 'local',
  auth: {
    issuer: process.env.AUTH_TOKEN_ISSUER ?? 'ari',
    secret: process.env.AUTH_SECRET ?? 'AUTH_SECRET_KEY'
  },
  email: {
    fromName: 'ARI Delivery',
    fromEmail: process.env.EMAIL_FROM_ADDRESS || 'conctact@linnify.com',
    disabled: process.env.EMAIL_DISABLED === 'true',
    apiKey: process.env.EMAIL_API_KEY
  },
  gcs: {
    url: process.env.GCS_URL || 'https://storage.googleapis.com/ari-development-assets'
  },
  stripe: {
    apiKey: process.env.STRIPE_API_KEY || 'stripe_key',
    checkoutWebhookSecret: process.env.STRIPE_CHECKOUT_WEBHOOK_SECRET || 'secret'
  }
};

export default env;
