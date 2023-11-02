<template>
    <Html lang="vi">
        <Head>
            <Title>Nuxivy</Title>
        </Head>

        <Body class="font-sans font-normal overflow-x-hidden text-sm bg-white text-dark-700">
            <NuxtLayout>
                <NuxtLoadingIndicator />
                <NuxtPage />
            </NuxtLayout>

            <UNotifications />
        </Body>
    </Html>
</template>

<style>
.page-leave-active,
.page-enter-active {
  transition: all 0.2s;
}

.page-enter-from {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(-30px);
}

.page-leave-to {
  opacity: 0;
  transition: all 0.2s;
  transform: translateX(30px);
}
</style>
