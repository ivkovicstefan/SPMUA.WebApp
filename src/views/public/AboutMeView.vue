<template>
    <div class="flex flex-col">
        <div class="grid grid-cols-2 gap-20 px-10 py-6 pb-12 lg:px-48">
            <div class="flex flex-col gap-y-3 col-span-2 lg:col-span-1 text-zinc-500">
                <h1 class="text-black leading-[1] text-[2.35rem] lg:text-5xl mb-8 lg:mb-12">Upoznaj me</h1>
                <p class="text-lg text-justify">
                    Zdravo, ja sam Petra! Imam dvadeset dve godine i <b>profesionalni sam šminker i edukator</b>. Trenutno radim u <b>Beogradu i Jagodini</b>.
                </p>
                <p class="text-lg text-justify">
                    Moja ljubav prema šminkanju počela je kada sam imala samo 16 godina. Od prvog trenutka kada sam uzela četkicu u ruke, znala sam da je to moj životni poziv. Ništa drugo nije budilo takvu strast i emociju u meni.
                </p>
                <p class="text-lg text-justify">
                    Za mene šminkanje nije samo posao. To je moj način da pronađem mir i izrazim svoju kreativnost.
                    <br>
                    Najlepše je raditi ono što najviše voliš, iz razloga što te to podstiče da budeš bolji i od samog sebe. Kada nešto radiš sa ljubavlju, nijedan radni dan nije težak.
                </p>
            </div>
            <div class="hidden lg:block">
                <img class="object-cover rounded-xl h-[500px] w-full" src="@/assets/gallery-picture-5.jpg">
            </div>
        </div>
        <div class="flex flex-col py-6 bg-zinc-50 px-10 py-11 lg:px-48 border-y">
            <h1 class="text-black leading-[1] text-[2.35rem] lg:text-5xl mb-8 lg:mb-12">Šta kažu klijenti</h1>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div
                    class="row-span-2 flex flex-col border border-zinc-300 rounded-xl bg-white p-3 gap-y-3">
                    <div class="flex flex-row gap-3 items-center">
                        <img class="rounded-[50%] object-cover bg-pink-200 h-[2rem] w-[2rem]" src="@/assets/gallery-picture-1.png">
                        <div class="font-semibold text-black">Osoba 1</div>
                    </div>
                    <p class="text-left italic text-zinc-500">“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae error beatae nisi a ullam consequatur nesciunt deserunt nostrum illo, harum alias, doloribus magnam ratione accusamus? In minus vitae iusto distinctio? ”</p>
                </div>
                <div
                    class="flex flex-col border border-zinc-300 rounded-xl bg-white p-3 gap-y-3">
                    <div class="flex flex-row gap-3 items-center">
                        <img class="rounded-[50%] object-cover bg-pink-200 h-[2rem] w-[2rem]" src="@/assets/gallery-picture-2.jpg">
                        <div class="font-semibold text-black">Osoba 2</div>
                    </div>
                    <p class="text-left italic text-zinc-500">“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae error beatae nisi a ullam consequatur nesciunt deserunt nostrum illo, harum alias, doloribus magnam ratione accusamus? In minus vitae iusto distinctio? ”</p>
                </div>
                <div
                    class="flex flex-col border border-zinc-300 rounded-xl bg-white p-3 gap-y-3">
                    <div class="flex flex-row gap-3 items-center">
                        <img class="rounded-[50%] object-cover bg-pink-200 h-[2rem] w-[2rem]" src="@/assets/gallery-picture-4.jpg">
                        <div class="font-semibold text-black">Osoba 3</div>
                    </div>
                    <p class="text-left italic text-zinc-500">“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae error beatae nisi a ullam consequatur nesciunt deserunt nostrum illo, harum alias, doloribus magnam ratione accusamus? In minus vitae iusto distinctio? ”</p>
                </div>
                <div
                    class="flex flex-col border border-zinc-300 rounded-xl bg-white p-3 gap-y-3">
                    <div class="flex flex-row gap-3 items-center">
                        <img class="rounded-[50%] object-cover bg-pink-200 h-[2rem] w-[2rem]" src="@/assets/gallery-picture-5.jpg">
                        <div class="font-semibold text-black">Osoba 4</div>
                    </div>
                    <p class="text-left italic text-zinc-500">“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae error beatae nisi a ullam consequatur nesciunt deserunt nostrum illo, harum alias, doloribus magnam ratione accusamus? In minus vitae iusto distinctio? ”</p>
                </div>
                <div
                    class="flex flex-col border border-zinc-300 rounded-xl bg-white p-3 gap-y-3">
                    <div class="flex flex-row gap-3 items-center">
                        <img class="rounded-[50%] object-cover bg-pink-200 h-[2rem] w-[2rem]" src="@/assets/gallery-picture-6.jpg">
                        <div class="font-semibold text-black">Osoba 5</div>
                    </div>
                    <p class="text-left italic text-zinc-500">“ Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae error beatae nisi a ullam consequatur nesciunt deserunt nostrum illo, harum alias, doloribus magnam ratione accusamus? In minus vitae iusto distinctio? ”</p>
                </div>
            </div>
        </div>
    </div>
</template>