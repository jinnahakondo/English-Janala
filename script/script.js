const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(json => loadInUi(json.data))

}

const loadInUi = (lessons) => {
    const lessonCon = document.getElementById("lesson-con")
    lessonCon.innerHTML = "";
    for (const lesson of lessons) {
        const lessonBtn = document.createElement("div")
        lessonBtn.innerHTML = `
         <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson- ${lesson.level_no}</button>
        `;
        lessonCon.append(lessonBtn)
    }
}
const loadLevelWord = id => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayLevelWord(data.data))
}
const displayLevelWord = words => {
    const wordsCon = document.getElementById("words-con")
    wordsCon.innerHTML = "";
    words.forEach(word => {
        console.log(word)
        const card = document.createElement("div")
        card.innerHTML =
         `<div class="space-y-7 text-center bg-white py-14 px-7 rounded-xl shadow-sm">
                <h2 class="font-bold text-2xl"> ${word.word}</h2>
                <p class="font-medium ">Meaning /Pronounciation</p>
                <p class="font-bangla text-2xl font-medium text-gray-700">${word.meaning}/${word.pronunciation}</p>
                <div class="flex justify-between items-center">
                <button class="bg-[rgba(26,145,255,0.1)] p-2 rounded-lg hover:bg-[rgba(26,145,255,0.5)]"><i class="fa-solid fa-circle-info bg-[rgba(26,145,255,0.1)]"></i></button>
                <button class="bg-[rgba(26,145,255,0.1)] p-2 rounded-lg hover:bg-[rgba(26,145,255,0.5)]"><i class="fa-solid fa-volume-high "></i></button>
                </div>
        </div>`
        wordsCon.append(card)
    });

}
loadLessons();