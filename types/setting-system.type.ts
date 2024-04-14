export interface ISettingSystemForm {
    id?: string
    label: string
    key: string
    value: string
    description?: string
    input_type: string
    setting_system_options?: {
        id: string
        name: string
    }[]
}

export interface IMetadata {
    theme_colour: string
    system: ISettingSystemForm[]
}
