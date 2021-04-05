export interface PathParameters {
    [parameterName: string]: string;
}

export class URLUtils {
    public static create(url: string, parameters: PathParameters) {
        const placeholders = url.match(/({[a-zA-Z]*})/g);
        placeholders.forEach((placeholder: string) => {
            const key = placeholder.substr(1, placeholder.length - 2);
            const value = parameters[key];
            if(!value) {
                throw new Error(`Parameter ${key} was not provided`);
            }
            url = url.replace(placeholder, encodeURIComponent(value));
        });
        return url;
    }
}