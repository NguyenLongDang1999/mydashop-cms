<script setup lang="ts">

// ** useHooks
const { data } = await useOrdersDetail()
</script>

<template>
    <section>
        <TheTitle
            label="Quản lý bán hàng"
            title="Chi tiết đơn hàng"
        />

        {{ data }}

        <div class="mt-8 pb-24 max-w-none">
            <UCard>
                <div class="grid gap-4 grid-cols-12">
                    <div class="col-span-6">
                        <ul class="flex flex-col mt-3 gap-3">
                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Họ và tên:</span>

                                <span class="capitalize flex-1">{{ data.name }}</span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">SĐT:</span>

                                <span class="flex-1">{{ data.phone }}</span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Email:</span>

                                <span class="flex-1">{{ data.email }}</span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Ghi chú:</span>

                                <span class="flex-1">{{ data.note }}</span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Địa chỉ giao hàng:</span>

                                <span class="flex-1">{{ data.shipping_address }}</span>
                            </li>
                        </ul>
                    </div>

                    <div class="col-span-6">
                        <ul class="flex flex-col mt-3 gap-3">
                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Mã đơn hàng:</span>

                                <span class="capitalize flex-1">{{ data.code }}</span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Trạng thái:</span>

                                <span class="capitalize flex-1">{{ data.status }}</span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Ngày đặt hàng:</span>

                                <span class="capitalize flex-1">{{ formatDateTime(data.date) }}</span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Tổng tiền:</span>

                                <span class="capitalize flex-1">{{ formatCurrency(Number(data.grand_total)) }}</span>
                            </li>

                            <li class="flex items-start gap-2">
                                <span class="font-semibold capitalize">Phương thức thanh toán:</span>

                                <span class="capitalize flex-1">Thanh toán tại nhà</span>
                            </li>
                        </ul>
                    </div>

                    <div class="col-span-12">
                        <div class="mt-4 flex border border-gray-200 dark:border-gray-700 relative rounded-md not-prose bg-white dark:bg-gray-900">
                            <UTable
                                :rows="data.OrderDetails"
                                :columns="orderProductColumns"
                                class="w-full"
                                :ui="{ td: { base: 'max-w-[0]' }, th: { base: 'whitespace-nowrap' } }"
                            >
                                <template #name-data="{ row }: IRow<IProduct>">
                                    <ULink :to="goToPage(row.product.id, ROUTER.PRODUCT)">
                                        <div class="flex items-center gap-1">
                                            <UAvatar
                                                :src="getPathImageFile(row.product.image_uri)"
                                                :alt="row.product.name"
                                            />

                                            <div class="flex flex-col flex-1 truncate">
                                                <span class="capitalize text-primary truncate">{{ row.product.name }}</span>
                                                <span>{{ row.variation }}</span>
                                            </div>
                                        </div>
                                    </ULink>
                                </template>

                                <template #price-data="{ row }: IRow<IProduct>">
                                    <div class="flex flex-col flex-1 truncate">
                                        <span><strong>Giá Tiền:</strong> {{ formatCurrency(Number(row.price)) }}</span>
                                        <span><strong>Số Lượng:</strong> {{ row.quantity }}</span>
                                    </div>
                                </template>

                                <template #total-data="{ row }: IRow<IProduct>">
                                    <div class="flex flex-col flex-1 truncate">
                                        <span>{{ formatCurrency(Number(row.total_price)) }}</span>
                                    </div>
                                </template>
                            </UTable>
                        </div>

                        <div class="mt-4 flex justify-end">
                            <ul class="flex flex-col mt-3 gap-3">
                                <li class="flex items-start gap-2">
                                    <span class="font-semibold capitalize">Tổng tiền:</span>

                                    <span class="capitalize flex-1">{{ formatCurrency(Number(data.grand_total)) }}</span>
                                </li>

                                <li class="flex items-start gap-2">
                                    <span class="font-semibold capitalize">Mã giảm giá:</span>

                                    <span class="capitalize flex-1">{{ formatCurrency(Number(data.coupon_discount)) }}</span>
                                </li>

                                <li class="flex items-start gap-2">
                                    <span class="font-semibold capitalize">Tổng thanh toán:</span>

                                    <span class="capitalize flex-1">{{ formatCurrency(Number(data.coupon_discount)) }}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </UCard>
        </div>
    </section>
</template>
