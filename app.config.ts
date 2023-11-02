export default defineAppConfig({
    ui: {
        primary: 'blue',
        notification: {
            wrapper: 'w-64 pointer-events-auto fixed top-3 right-3'
        },
        card: {
            base: 'border border-gray-200 dark:border-gray-800',
            body: {
                padding: 'sm:px-6'
            }
        },
        modal: {
            container: 'flex min-h-full items-center sm:items-center justify-center text-center',
            width: 'sm:max-w-2xl'
        },
        formGroup: {
            label: {
                base: 'block font-medium text-gray-700 dark:text-gray-200 capitalize'
            }
        },
        button: {
            font: 'font-medium capitalize'
        },
        table: {
            thead: 'capitalize'
        },
        tabs: {
            list: {
                tab: {
                    font: 'font-medium capitalize'
                }
            }
        }
    }
})
