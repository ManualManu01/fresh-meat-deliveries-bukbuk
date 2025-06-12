
export const validatePhoneNumber = (phone: string): { isValid: boolean; message: string } => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check if it's a valid Indian phone number (10 digits starting with 6-9)
  if (cleanPhone.length !== 10) {
    return { isValid: false, message: 'Phone number must be 10 digits' };
  }
  
  if (!/^[6-9]/.test(cleanPhone)) {
    return { isValid: false, message: 'Phone number must start with 6, 7, 8, or 9' };
  }
  
  return { isValid: true, message: '' };
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Format as XXX-XXX-XXXX
  if (cleanPhone.length >= 6) {
    return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3, 6)}-${cleanPhone.slice(6, 10)}`;
  } else if (cleanPhone.length >= 3) {
    return `${cleanPhone.slice(0, 3)}-${cleanPhone.slice(3)}`;
  }
  
  return cleanPhone;
};
