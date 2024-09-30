const testAml = [
    {
        date: "27-6-2024 13:35",
        username: "08096596047",
        ip: "102.90.46.23",
        op: "Rapid Transaction",
        status: "Success"
    },
    {
        date: "24-6-2024 12:35",
        username: "0808564789",
        ip: "102.64.46.23",
        op: "High Amount Rate",
        status: "Failed"
    },
    {
        date: "24-6-2024 13:35",
        username: "08065783902",
        ip: "109.90.46.23",
        op: "Rapid Transaction",
        status: "Success"
    },
    {
        date: "20-6-2024 13:35",
        username: "08054119389",
        ip: "102.90.416.22",
        op: "Rapid Transaction",
        status: "Success"
    },
    {
        date: "18-6-2024 13:35",
        username: "08076789902",
        ip: "103.90.46.25",
        op: "High Amount Rate",
        status: "Success"
    },
    {
        date: "27-6-2024 13:35",
        username: "08096596047",
        ip: "102.90.46.23",
        op: "Rapid Transaction",
        status: "Success"
    },
    {
        date: "27-6-2024 13:35",
        username: "08096596047",
        ip: "102.90.46.23",
        op: "Rapid Transaction",
        status: "Success"
    }
]


export function validatePassword(str) {
    // Check if the string is up to 8 characters
    if (str.length < 8) {
      return false;
    }
  
    // Regular expressions for validation
    const hasUpperCase = /[A-Z]/.test(str);
    const hasLowerCase = /[a-z]/.test(str);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(str);
    const hasNumber = /\d/.test(str)
  
    // Check if all conditions are met
    return hasUpperCase && hasLowerCase && hasSpecialChar && hasNumber
  }