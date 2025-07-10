export function randomString(len: number): string {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +  
        "abcdefghijklmnopqrstuvwxyz" +  
        "0123456789" +                 
        "!@#$%^&*()_+-=[]{}|;:',.<>?/"; 

    const charsLength = chars.length;
    let result = "";

    for (let i = 0; i < len; i++) {
        const randomIndex = Math.floor(Math.random() * charsLength);
        result += chars[randomIndex];
    }

    return result;
}
