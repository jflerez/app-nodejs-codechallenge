export interface FormatResponse {
  success: boolean;
  message: string;
  record?: any;
}

export const formatResponse = (
  record?,
  message?,
  success = true,
): FormatResponse => ({
  success,
  ...(message && {
    message,
  }),
  ...(record && {
    record,
  }),
});
