const createElementS = synonyms => {
    const elements = synonyms.map(el => `<button class="btn bg-[#EDF7FF]">${el}</button>`);
    return elements.join(" ")
}

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
    manageLoading(true)
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
        manageLoading(false)
        return;
    }
    words.forEach(word => {
        const card = document.createElement("div")
        card.innerHTML =
            `<div class="space-y-7 text-center bg-white py-14 px-7 rounded-xl shadow-sm h-full">
                <h2 class="font-bold text-2xl"> ${word.word ? word.word : "কোনো শব্দ পাওয়া যায়নি"}</h2>
                <p class="font-medium ">Meaning /Pronounciation</p>
                <p class="font-bangla text-2xl font-medium text-gray-700">${word.meaning ? word.meaning : "কোনো অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}</p>
                <div class="flex justify-between items-center">
                <button  onclick="loadWordDetels(${word.id})" class="bg-[rgba(26,145,255,0.1)] p-2 rounded-lg hover:bg-[rgba(26,145,255,0.5)]"><i class="fa-solid fa-circle-info bg-[rgba(26,145,255,0.1)]"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="bg-[rgba(26,145,255,0.1)] p-2 rounded-lg hover:bg-[rgba(26,145,255,0.5)]"><i class="fa-solid fa-volume-high "></i></button>
                </div>
        </div>`
        wordsCon.append(card)
        manageLoading(false)

    });

}
// loading 
const manageLoading = loading => {
    if (loading === true) {
        document.getElementById("loading-Con").classList.remove("invisible")
        document.getElementById("words-con").classList.add("invisible")
    }
    else {
        document.getElementById("loading-Con").classList.add("invisible")
        document.getElementById("words-con").classList.remove("invisible")
    }
}

const loadWordDetels = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    // console.log(url)
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data)
}
const displayWordDetails = (wordDetails) => {
    document.getElementById("word-details_modal").showModal()
    const wordDetailsCon = document.getElementById("details-con");
    wordDetailsCon.innerHTML =
        `
                        <div class="space-y-7">
                    <div>
                        <h2 class="text-2xl font-bold">${wordDetails.word} (<i class="fa-solid fa-microphone-lines"></i>:<span
                                class="font-bangla">${wordDetails.pronunciation}</span>)</h2>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold">Meaning</h4>
                        <p class="font-bangla text-lg"> ${wordDetails.meaning}</p>
                    </div>
                    <div>
                        <h4 class="text-xl font-semibold">Example</h4>
                        <p class="text-gray-600 text-lg">${wordDetails.sentence}</p>
                    </div>
                    <div>
                        <h4 class="text-xl font-medium font-bangla mb-2">সমার্থক শব্দ গুলো</h4>
                        <div class="space-x-3">${createElementS(wordDetails.synonyms)}
                        </div>
                    </div>
                </div>
    `;
}
loadLessons();
// search
document.getElementById("search-btn").addEventListener("click", () => {
    removeActive()
    const searchValue = document.getElementById("search-input").value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(data => {
            const words = data.data;
            const filterWords = words.filter(word => word.word.toLowerCase().includes(searchValue))
            displayLevelWord(filterWords)
        })

})

// speak words 
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}