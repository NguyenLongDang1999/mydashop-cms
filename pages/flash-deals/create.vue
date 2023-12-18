<script setup lang="ts">

// ** Validations Imports
import { label, schema } from '~/validations/flash-deals'

// ** useHooks
const { path } = useProduct()
const { isPending, mutateAsync } = useFlashDealFormInput()
const { handleSubmit, values: flashDeals } = useForm({ validationSchema: schema })

// ** Methods
const onSubmit = handleSubmit(async values => {
    await mutateAsync({
        ...values,
        start_date: flashDeals.date_range?.start,
        end_date: flashDeals.date_range?.end
    })

    navigateTo(ROUTER.FLASH_DEALS)
})
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý sản phẩm"
            title="Chiến dịch"
        />

        <div class="mt-8 pb-24 max-w-none">
            <UForm
                :state="{}"
                @submit="onSubmit"
            >
                <UCard>
                    <template #header>
                        <div class="flex justify-between items-center">
                            <h2 class="capitalize font-semibold text-xl text-gray-900 dark:text-white leading-tight my-0">
                                Thêm mới chiến dịch
                            </h2>
                        </div>
                    </template>

                    <div class="grid gap-4 grid-cols-12">
                        <div class="sm:col-span-6 col-span-12">
                            <FormInput
                                :label="label.campaign_name"
                                name="campaign_name"
                            />
                        </div>

                        <div class="sm:col-span-6 col-span-12">
                            <FormDatePickerRange
                                :label="label.date_range"
                                name="date_range"
                            />
                        </div>

                        <div class="sm:col-span-6 col-span-12">
                            <FormSelect
                                :label="label.status"
                                :options="optionStatus"
                                name="status"
                            />
                        </div>

                        <div class="sm:col-span-6 col-span-12">
                            <FormSelect
                                :label="label.popular"
                                :options="optionPopular"
                                name="popular"
                            />
                        </div>

                        <div class="col-span-12">
                            <FlashDealsProductSelected
                                :label="label.product_selected"
                                name="product_id"
                            />
                        </div>

                        <div
                            v-if="flashDeals.product_id?.length"
                            class="col-span-12"
                        >
                            <UDivider icon="i-heroicons-chevron-double-down" />
                        </div>

                        <div class="col-span-12 flex flex-col gap-4">
                            <div
                                v-for="(productItem, index) in flashDeals.product_id"
                                :key="productItem.id"
                                class="grid grid-cols-12 items-center gap-4"
                            >
                                <div class="md:col-span-3 col-span-6">
                                    <div class="flex items-center gap-1">
                                        <UAvatar
                                            :src="getImageFile(path, productItem.image_uri)"
                                            :alt="productItem.name"
                                        />

                                        <div class="flex flex-col flex-1 truncate">
                                            <span class="capitalize truncate">{{ productItem.name }}</span>
                                            <span>{{ formatCurrency(Number(productItem.price)) }}</span>
                                        </div>
                                    </div>
                                </div>

                                <div class="md:col-span-3 col-span-6">
                                    <FormSelect
                                        :label="label.discount_type"
                                        :options="optionTypeDiscount"
                                        :name="`flashDealsProduct.${index}.discount_type`"
                                    />
                                </div>

                                <div class="md:col-span-3 col-span-6">
                                    <FormMoney
                                        :label="label.discount_amount"
                                        :name="`flashDealsProduct.${index}.discount_amount`"
                                    />
                                </div>

                                <div class="col-span-1">
                                    <FormInput
                                        type="hidden"
                                        :model-value="productItem.id"
                                        :name="`flashDealsProduct.${index}.id`"
                                    />
                                </div>

                                <div class="col-span-12">
                                    <UDivider />
                                </div>
                            </div>
                        </div>
                    </div>

                    <template #footer>
                        <div class="flex justify-start gap-4">
                            <UButton
                                type="submit"
                                size="sm"
                                variant="solid"
                                label="Thêm Mới"
                                :loading="isPending"
                                :trailing="false"
                            />

                            <UButton
                                type="reset"
                                size="sm"
                                color="gray"
                                variant="solid"
                                label="Quay Lại"
                                :trailing="false"
                                @click="navigateTo(ROUTER.FLASH_DEALS)"
                            />
                        </div>
                    </template>
                </UCard>
            </UForm>
        </div>
    </section>
</template>
