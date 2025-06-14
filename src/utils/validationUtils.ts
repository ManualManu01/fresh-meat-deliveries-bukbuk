
export const validateAddress = (address: string): { isValid: boolean; message: string } => {
  if (!address || address.trim().length === 0) {
    return { isValid: false, message: "Address is required" };
  }
  
  if (address.trim().length < 10) {
    return { isValid: false, message: "Please enter a complete address (minimum 10 characters)" };
  }
  
  if (address.trim().length > 200) {
    return { isValid: false, message: "Address is too long (maximum 200 characters)" };
  }
  
  return { isValid: true, message: "" };
};

export const validatePhoneNumber = (phone: string): { isValid: boolean; message: string } => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  if (!phone || phone.trim().length === 0) {
    return { isValid: false, message: "Phone number is required" };
  }
  
  if (digitsOnly.length !== 10) {
    return { isValid: false, message: "Phone number must be exactly 10 digits" };
  }
  
  // Check if it's all the same digit (like 1111111111)
  if (new Set(digitsOnly).size === 1) {
    return { isValid: false, message: "Please enter a valid phone number" };
  }
  
  return { isValid: true, message: "" };
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Format as XXX-XXX-XXXX
  if (digitsOnly.length >= 6) {
    return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 6)}-${digitsOnly.slice(6, 10)}`;
  } else if (digitsOnly.length >= 3) {
    return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
  } else {
    return digitsOnly;
  }
};

export const validateEmail = (email: string): { isValid: boolean; message: string } => {
  if (!email || email.trim().length === 0) {
    return { isValid: false, message: "Email is required" };
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  
  return { isValid: true, message: "" };
};

export const validateName = (name: string): { isValid: boolean; message: string } => {
  if (!name || name.trim().length === 0) {
    return { isValid: false, message: "Name is required" };
  }
  
  if (name.trim().length < 2) {
    return { isValid: false, message: "Name must be at least 2 characters long" };
  }
  
  if (name.trim().length > 50) {
    return { isValid: false, message: "Name is too long (maximum 50 characters)" };
  }
  
  return { isValid: true, message: "" };
};
