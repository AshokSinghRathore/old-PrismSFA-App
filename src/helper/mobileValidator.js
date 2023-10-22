export function mobileNumberValidator(mobileNumber) {
    const re = /^\d{10}$/; // This regular expression ensures 10 digits.
    if (!mobileNumber) return "Mobile number can't be empty.";
    if (!re.test(mobileNumber)) return 'Oops! Mobile number should be 10 digits long and contain only numbers.';
    return '';
  }
  