export interface ISettingSystemForm {
    id?: string
    label: string
    key: string
    value: string
    input_type: string
    setting_system_options: {
        id: string
        name: string
    }[]
}
