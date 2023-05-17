const addbtn = document.querySelector("#addbtn")

addbtn.addEventListener("click",()=>{
    addNote();
})
const saveNote = ()=>{
    const notes = document.querySelectorAll(".notes textarea");
    const data = [];
    notes.forEach((note)=>{
        data.push(note.value)
    })
    console.log(data)
    if(data.length == 0){
        localStorage.removeItem("Notes")
    }else{
        localStorage.setItem("Notes",JSON.stringify(data))
    }
}
const addNote = (savedtext = "")=>{
    
    const note = document.createElement("div")
    const main = document.querySelector(".main")
    note.classList.add("notes")
    note.innerHTML = `
    <div class="toolbar">
        <i class="save icon fa-solid fa-floppy-disk fa-xl"></i>
        <i class="delete icon fa-solid fa-trash fa-xl"></i>
    </div>
    <textarea>${savedtext}</textarea>
    `
    note.querySelector(".save").addEventListener("click",()=>{
        saveNote();
    })  
    note.querySelector(".delete").addEventListener("click",()=>{
        note.remove();
        saveNote();
    })
    note.querySelector("textarea").addEventListener("focusout",()=>{
        saveNote();
    })
    main.appendChild(note)
    saveNote();
}

(
    ()=>{
        const lsNotes = JSON.parse(localStorage.getItem("Notes"))
        // console.log(lsNotes);
        if(lsNotes == null){
            addNote();
        }else{
            lsNotes.forEach((lsNote)=>{
                addNote(lsNote);
                console.log(lsNote)
            })
        }
    }
)()