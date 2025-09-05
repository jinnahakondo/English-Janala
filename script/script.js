const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => loadInUi(json.data))

}
const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn")
    lessonBtns.forEach(lessonBtn => lessonBtn.classList.remove("active"))
}

const loadInUi = (lessons) => {
    const lessonCon = document.getElementById("lesson-con")
    lessonCon.innerHTML = "";
    for (const lesson of lessons) {
        const lessonBtn = document.createElement("div")
        lessonBtn.innerHTML = `
         <button id="lesson-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson- ${lesson.level_no}</button>
        `;
        lessonCon.append(lessonBtn)
    }
}
const loadLevelWord = id => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActive()
            const lessonClickBtn = document.getElementById(`lesson-${id}`)
            lessonClickBtn.classList.add("active")
            displayLevelWord(data.data)
        })
}
const displayLevelWord = words => {
    const wordsCon = document.getElementById("words-con")
    wordsCon.innerHTML = "";
    if (words.length == 0) {
        wordsCon.innerHTML = `
        <div class="space-y-8 col-span-full justify-center">
            <img src="assets/alert-error.png" class="mx-auto">
                <p class=" font-bangla text-gray-600 text-center ">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h2 class="text-4xl text-center">নেক্সট Lesson এ যান করুন।</h2>
        </div>`;
    }
    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML =
            `<div class="space-y-7 text-center bg-white py-14 px-7 rounded-xl shadow-sm h-full">
                <h2 class="font-bold text-2xl"> ${word.word ? word.word : "কোনো শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-medium ">Meaning /Pronounciation</p>
                <p class="font-bangla text-2xl font-medium text-gray-700">${word.meaning ? word.meaning : "কোনো অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</p>
                <div class="flex justify-between items-center">
                <button  onclick="my_modal_5.showModal()" class="bg-[rgba(26,145,255,0.1)] p-2 rounded-lg hover:bg-[rgba(26,145,255,0.5)]"><i class="fa-solid fa-circle-info bg-[rgba(26,145,255,0.1)]"></i></button>
                <button class="bg-[rgba(26,145,255,0.1)] p-2 rounded-lg hover:bg-[rgba(26,145,255,0.5)]"><i class="fa-solid fa-volume-high "></i></button>
                </div>
        </div>`
        wordsCon.append(card)
    });

}
loadLessons();