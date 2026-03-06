// Name
const submitBtn = document.getElementById("sign_btn");
const userName = document.getElementById("username");
const userPass = document.getElementById("password");
const modalContent = document.getElementById("modal_content");
const modalName = document.getElementById("user_not_match");
const loginPage = document.getElementById("login_page");
const allIssuesBtn = document.getElementById("all_issues_btn");
const openIssuesBtn = document.getElementById("open_issues_btn");
const closedIssuesBtn = document.getElementById("closed_issues_btn");
const cardContainer = document.getElementById("card_container")

// Submit Button Event
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const userValue = userName.value.trim();
    const passValue = userPass.value.trim();

    if (!userValue) {
        modalContent.innerHTML = `
             <h3 class="text-lg font-bold">Invalid!</h3>
                <p class="py-4">
                    Please Input Your Username!
                </p>`;
        modalName.showModal();
    } else {
        if (userValue !== "admin") {
            modalContent.innerHTML = `
             <h3 class="text-lg font-bold">Invalid!</h3>
                <p class="py-4">
                    Please Input Your Valid Username..!
                </p>`;
            modalName.showModal();
            userName.value = "";
        } else {
            if (!passValue) {
                modalContent.innerHTML = `
             <h3 class="text-lg font-bold">Invalid!</h3>
                <p class="py-4">
                    Please Input Your Password!
                </p>`;
                modalName.showModal();
            } else {
                if (passValue !== "admin123") {
                    modalContent.innerHTML = `
             <h3 class="text-lg font-bold">Invalid!</h3>
                <p class="py-4">
                    Please Input Your Valid Password..!
                </p>`;
                    modalName.showModal();
                    userPass.value = "";
                } else {
                    modalContent.innerHTML = `
             <h3 class="text-lg font-bold">Success!</h3>
                <p class="py-4">
                    You are Login Success
                </p>`;
                    modalName.showModal();
                    userName.value = "";
                    userPass.value = "";
                    loginPage.classList.add("hidden");
                }
            }
        }
    }
});

// Toggle Button
const toggleBtn = () => {
    const categoryBtn = document.querySelectorAll(".category_btn");
    categoryBtn.forEach((btn) => {
        btn.classList.add("btn");
        btn.classList.remove("btn-primary")
    });
};
toggleBtn();


// Display Issues
const displayIssues = (data) => {
    cardContainer.innerHTML = "";
    data.forEach(item => {
        const div = document.createElement("div");
        div.classList =`${
            item.status === "open"?`card shadow-sm border border-t-5 border-success`:`card shadow-sm border border-t-5 border-primary`
        }`
        div.innerHTML = `
                                    <div class="card-body">
                                <div class="card_content">
                                    <div
                                        class="flex justify-between items-center mb-3"
                                    >
                                        ${
                                            item.status === "open"?`<img
                                            src="assets/Open-Status.png"
                                            alt=""
                                        />`:`<img
                                            src="assets/Closed- Status .png"
                                            alt=""
                                        />`
                                        }
                                        ${
                                            item.priority === "high"?`<div
                                            class="badge badge-error badge-soft border-error/30 rounded-full"
                                        >
                                            HIGH
                                        </div>`:item.priority === "medium"?`<div
                                            class="badge badge-warning badge-soft border-warning/30 rounded-full"
                                        >
                                            MEDIUM
                                        </div>`:item.priority === "low"?`<div
                                            class="badge badge-ghost badge-soft border-neutral/30 rounded-full"
                                        >
                                            LOW
                                        </div>`:""
                                        }
                                    </div>
                                    <h2
                                        class="card-header text-[14px] font-semibold mb-2"
                                    >
                                        ${item.title}
                                    </h2>
                                    <p
                                        class="line-clamp-2 text-[12px] text-[#64748B] mb-3"
                                    >
                                        ${item.description}
                                    </p>
                                    <div class="flex flex-wrap gap-2">
                                    ${item.labels.map(label =>label === "bug"?`<div class="badge badge-soft border-error/40 badge-error rounded-full"><i class="fa-solid fa-bug"></i> BUG</div>`:label === "enhancement"?`<div class="badge badge-soft border-success/40 badge-success rounded-full"><i class="fa-solid fa-wand-magic-sparkles"></i> ENHANCEMENT
                                    </div>`:label === "help wanted"?`<div class="badge badge-soft border-warning/40 badge-warning rounded-full"><i class="fa-regular fa-life-ring"></i>Help Wanted </div>`:label === "good first issue"?`<div
                                    class="badge badge-soft border-primary/40 badge-primary rounded-full">
                                   <i class="fa-solid fa-medal"></i> GOOD FIRST ISSUE
                                   </div>`:label=== "documentation"?`<div
                                    class="badge badge-soft border-secondary/40 badge-secondary rounded-full">
                                   <i class="fa-brands fa-readme"></i> DOCUMENTATION
                                   </div>`:"").join("")}
                                    </div>
                                </div>
                            </div>
                            <div
                                class="border border-base-300 p-6 text-[12px] text-[#64748B]"
                            >
                                <p>#1 by ${item.author}</p>
                                <p>${item.updatedAt.slice(0,10)}</p>
                            </div>
        `
        cardContainer.appendChild(div)
    })
}


//All Issues
allIssuesBtn.addEventListener("click",()=>{
    allIssues()
})
const allIssues = async () => {
    toggleBtn();
    allIssuesBtn.classList.add("btn-primary");
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const data = await res.json();
    displayIssues(data.data);
    
};
allIssues();



// Open Issues 

openIssuesBtn.addEventListener("click",()=>{
    openIssues()
})
const openIssues = () => {
    toggleBtn();
    openIssuesBtn.classList.add("btn-primary");
    
};


// closed Issues 

closedIssuesBtn.addEventListener("click",()=>{
    closedIssues()
})
const closedIssues = () => {
    toggleBtn();
    closedIssuesBtn.classList.add("btn-primary");
    console.log("open closed");
};