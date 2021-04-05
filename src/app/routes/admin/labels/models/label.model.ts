export interface LabelModel {
    labelKey: string;
    labelValue: string;
}

export interface LanguageModel {
    id: number;
    created: Date;
    lastUpdate: Date;
    code: string;
    dir: string;
    isDefault: boolean;
    label: string;
}