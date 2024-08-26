import { Request, Response, NextFunction } from 'express';
import { HelmetOptions } from 'helmet';

// Allows websites to specify which functions and features can be used by other fonts (such as iframes)
const validatePermisionPolicy = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Define the policies you wish to establish
  const permissionsPolicy =
    'geolocation=(), microphone=(), camera=(), fullscreen=()';

  // Configures Permissions-Policy header in HTTP response
  res.setHeader('Permissions-Policy', permissionsPolicy);

  // Continues with the following middleware
  next();
};

const helmetOptions: HelmetOptions = {
  xFrameOptions: { action: 'deny' },
  contentSecurityPolicy: {
    directives: {
      scriptSrc: ["'self'"],
    },
  },
};

export { validatePermisionPolicy, helmetOptions };
