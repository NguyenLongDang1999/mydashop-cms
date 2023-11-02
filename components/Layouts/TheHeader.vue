<script setup lang="ts">

// ** useHooks
const { refetch } = useAuthLogout()

const items = [
    [
        {
            label: 'ben@example.com',
            slot: 'account',
            disabled: true
        }
    ],
    [
        {
            label: 'Settings',
            icon: 'i-heroicons-cog-8-tooth'
        }
    ],
    [
        {
            label: 'Documentation',
            icon: 'i-heroicons-book-open'
        },
        {
            label: 'Changelog',
            icon: 'i-heroicons-megaphone'
        },
        {
            label: 'Status',
            icon: 'i-heroicons-signal'
        }
    ],
    [
        {
            label: 'Sign out',
            icon: 'i-heroicons-arrow-left-on-rectangle',
            click: () => refetch()
        }
    ]
]
</script>

<template>
    <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
        <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div class="flex items-center justify-between gap-3 h-16">
                <div class="lg:flex-1 flex items-center gap-1.5">
                    <Logo />
                </div>

                <div class="flex items-center justify-end lg:flex-1 gap-1.5">
                    <UDropdown
                        :items="items"
                        :ui="{ item: { disabled: 'cursor-text select-text' } }"
                        :popper="{ placement: 'bottom-start' }"
                    >
                        <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" />

                        <template #account="{ item }">
                            <div class="text-left">
                                <p>Signed in as</p>
                                <p class="truncate font-medium text-gray-900 dark:text-white">
                                    {{ item.label }}
                                </p>
                            </div>
                        </template>

                        <template #item="{ item }">
                            <span class="truncate">{{ item.label }}</span>
                            <UIcon
                                :name="item.icon"
                                class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto"
                            />
                        </template>
                    </UDropdown>
                </div>
            </div>
        </div>
    </header>
</template>
