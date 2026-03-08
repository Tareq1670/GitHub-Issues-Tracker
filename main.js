// Name
const submitBtn = document.getElementById("sign_btn");
const userName = document.getElementById("username");
const userPass = document.getElementById("password");
const modalContent = document.getElementById("modal_content");
const modalName = document.getElementById("invalid_modal");
const loginPage = document.getElementById("login_page");
const allIssuesBtn = document.getElementById("all_issues_btn");
const openIssuesBtn = document.getElementById("open_issues_btn");
const closedIssuesBtn = document.getElementById("closed_issues_btn");
const cardContainer = document.getElementById("card_container");
const countIssues = document.getElementById("issues_count");
const loadingSection = document.getElementById("loading");
const issuesContent = document.getElementById("issues_content");
const popModalBox = document.getElementById("pop_modal_box");
const popModalContent = document.getElementById("pop_modal_content");
const loadingModal = document.getElementById("loading_modal");
const mainContainer = document.getElementById("main_container");
const inputField = document.getElementById("input_field");
const searchBtn = document.getElementById("search_btn");

// Submit Button Event
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const userValue = userName.value.trim();
    const passValue = userPass.value.trim();

    if (!userValue || !userPass) {
        modalContent.innerHTML = `
             <h3 class="text-lg font-bold">Invalid!</h3>
                <p class="py-4">
                    Please Input Your Username and Password..!
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
                    You are Login Success..🎈
                </p>`;
                    modalName.showModal();
                    userName.value = "";
                    userPass.value = "";
                    loginPage.classList.add("hidden");
                    mainContainer.classList.remove("hidden");
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
        btn.classList.remove("btn-primary");
    });
};


// Display Issues
const displayIssues = (data) => {
    cardContainer.innerHTML = "";
    if (!data.length) {
        const div = document.createElement("div");
        div.classList = "h-[450px] flex items-center justify-center";
        const h2 = document.createElement("h2");
        h2.classList = "font-bold text-2xl text-[#64748B]";
        h2.textContent = "There are no Issues..!";
        div.appendChild(h2);
        cardContainer.appendChild(div);
    } else
        data.forEach((item) => {
            const div = document.createElement("div");
            div.onclick = () => getModal(item.id);
            div.classList = `${
                item.status === "open"
                    ? `card shadow-sm border-t-5 border-success`
                    : `card shadow-sm border-t-5 border-[#a754f5]`
            }`;
            div.innerHTML = `
                                    <div  class="card-body">
                                <div class="card_content">
                                    <div
                                        class="flex justify-between items-center mb-3"
                                    >
                                        ${
                                            item.status === "open"
                                                ? `<img
                                            src="assets/Open-Status.png"
                                            alt=""
                                        />`
                                                : `<img
                                            src="assets/Closed- Status .png"
                                            alt=""
                                        />`
                                        }
                                        ${
                                            item.priority === "high"
                                                ? `<div
                                            class="badge badge-error badge-soft border-error/30 rounded-full uppercase"
                                        >
                                            ${item.priority}
                                        </div>`
                                                : item.priority === "medium"
                                                  ? `<div
                                            class="badge badge-warning badge-soft border-warning/30 rounded-full uppercase"
                                        >
                                            ${item.priority}
                                        </div>`
                                                  : item.priority === "low"
                                                    ? `<div
                                            class="badge badge-ghost badge-soft border-neutral/30 rounded-full uppercase"
                                        >
                                            ${item.priority}
                                        </div>`
                                                    : ""
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
                                    ${item.labels
                                        .map((label) =>
                                            label === "bug"
                                                ? `<div class="badge badge-soft border-error/40 badge-error rounded-full uppercase"><i class="fa-solid fa-bug"></i>${label}</div>`
                                                : label === "enhancement"
                                                  ? `<div class="badge badge-soft border-success/40 badge-success rounded-full uppercase"><i class="fa-solid fa-wand-magic-sparkles"></i> ${label}
                                                    </div>`
                                                  : label === "help wanted"
                                                    ? `<div class="badge badge-soft border-warning/40 badge-warning rounded-full uppercase"><i class="fa-regular fa-life-ring"></i>${label}</div>`
                                                    : label ===
                                                        "good first issue"
                                                      ? `<div
                                    class="badge badge-soft border-primary/40 badge-primary rounded-full uppercase">
                                   <i class="fa-solid fa-medal"></i> ${label}
                                   </div>`
                                                      : label ===
                                                          "documentation"
                                                        ? `<div
                                    class="badge badge-soft border-secondary/40 badge-secondary rounded-full uppercase">
                                   <i class="fa-brands fa-readme"></i> ${label}
                                   </div>`
                                                        : "",
                                        )
                                        .join("")}
                                    </div>
                                </div>
                            </div>
                            <div
                                class="border-t border-base-300 p-6 text-[12px] text-[#64748B]"
                            >
                                <p>#${item.id} by ${item.author}</p>
                                <p>${item.updatedAt.slice(0, 10)}</p>
                            </div>
        `;
            cardContainer.appendChild(div);
        });
    document.getElementById("issues_count").textContent = data.length;
};

//All Issues
allIssuesBtn.addEventListener("click", () => {
    startLoading();
    allIssues();
});
const allIssues = async () => {
    toggleBtn();
    allIssuesBtn.classList.add("btn-primary");
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    stopLoading();
    displayIssues(data.data);
};
document.addEventListener("DOMContentLoaded",()=>{
    toggleBtn();
    allIssues();
})

// Open Issues

openIssuesBtn.addEventListener("click", () => {
    openIssues();
});
const openIssues = async () => {
    toggleBtn();
    startLoading();
    openIssuesBtn.classList.add("btn-primary");
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    const allData = data.data;

    const openIssues = allData.filter((item) => item.status === "open");
    stopLoading();
    displayIssues(openIssues);
};

// closed Issues

closedIssuesBtn.addEventListener("click", () => {
    closedIssues();
});
const closedIssues = async () => {
    toggleBtn();
    startLoading();
    closedIssuesBtn.classList.add("btn-primary");
    const res = await fetch(
        "https://phi-lab-server.vercel.app/api/v1/lab/issues",
    );
    const data = await res.json();
    const allData = data.data;

    const closedIssues = allData.filter((item) => item.status === "closed");
    stopLoading();
    displayIssues(closedIssues);
};

// Loading Start and Stop
const startLoading = () => {
    loadingSection.classList.add("flex");
    loadingSection.classList.remove("hidden");
    issuesContent.classList.add("hidden");
    issuesContent.classList.remove("flex");
};

const stopLoading = () => {
    loadingSection.classList.remove("flex");
    loadingSection.classList.add("hidden");
    issuesContent.classList.remove("hidden");
};

// Modal Handler

const getModal = async (id) => {
    popModalContent.classList.add("hidden");
    loadingModal.classList.remove("hidden");
    popModalBox.showModal();
    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`,
    );
    const data = await res.json();
    loadingModal.classList.add("hidden");
    popModalContent.classList.remove("hidden");
    displayModal(data.data);
};

// Display Modal
const displayModal = (data) => {
    popModalContent.innerHTML = `
                        <h2 class="text-[24px] font-bold mb-2">${data.title}</h2>
                    <div class=" flex space-x-2 md:space-x-6 flex-wrap  items-center">
                        ${
                            data.status === "open"
                                ? `<div class="badge badge-success rounded-full text-white capitalize">${data.status}</div>`
                                : `<div class="badge bg-[#a754f5] rounded-full text-white capitalize">${data.status}</div>`
                        }
                        <ul class="flex list-disc gap-6 text-[12px] text-[#64748B] ml-4 md:m-0">
                            <li>${!data.assignee ? `No Author` : `Opened by ${data.author}`}</li>
                            <li>${data.updatedAt.slice(0, 10)}</li>
                        </ul>
                    </div>
                    <div class="labels flex flex-wrap gap-2 mt-[26px] mb-6">
                                    ${data.labels
                                        .map((label) =>
                                            label === "bug"
                                                ? `<div class="badge badge-soft border-error/40 badge-error rounded-full uppercase"><i class="fa-solid fa-bug"></i>${label}</div>`
                                                : label === "enhancement"
                                                  ? `<div class="badge badge-soft border-success/40 badge-success rounded-full uppercase"><i class="fa-solid fa-wand-magic-sparkles"></i> ${label}
                                    </div>`
                                                  : label === "help wanted"
                                                    ? `<div class="badge badge-soft border-warning/40 badge-warning rounded-full uppercase"><i class="fa-regular fa-life-ring"></i>${label}</div>`
                                                    : label ===
                                                        "good first issue"
                                                      ? `<div
                                    class="badge badge-soft border-primary/40 badge-primary rounded-full uppercase">
                                   <i class="fa-solid fa-medal"></i> ${label}
                                   </div>`
                                                      : label ===
                                                          "documentation"
                                                        ? `<div
                                    class="badge badge-soft border-secondary/40 badge-secondary rounded-full uppercase">
                                   <i class="fa-brands fa-readme"></i> ${label}
                                   </div>`
                                                        : "",
                                        )
                                        .join("")}
                    </div>
                    <p class="text-[#64748B] mt-6 mb-[27px]">${data.description}</p>

                    <div class="bg-base-200 flex gap-[30%] p-4 rounded-md">
                        <div>
                            <p class="text-[#64748B]">Assignee:</p>
                            <h2 class="font-semibold">${!data.assignee ? `No assignee` : `${data.assignee}`}</h2>
                        </div>
                        <div>
                            <p  class="text-[#64748B]">Priority:</p>
                            ${
                                data.priority === "high"
                                    ? `<div
                                            class="badge badge-error text-white rounded-full"
                                        >
                                            HEIGH
                                        </div>`
                                    : data.priority === "medium"
                                      ? `<div
                                            class="badge badge-warning text-white rounded-full"
                                        >
                                            MEDIUM
                                        </div>`
                                      : data.priority === "low"
                                        ? `<div
                                            class="badge border border-neutral/30 rounded-full"
                                        >
                                            LOW
                                        </div>`
                                        : ""
                            }
                        </div>
                    </div>
    `;
};

// Search Handler
inputField.addEventListener("keydown",(e)=>{
    if(e.key === "Enter"){
        searchBtn.click();
    }
})

searchBtn.addEventListener("click", () => {
    toggleBtn();
    startLoading();
    const inputValue = inputField.value;
    if (!inputValue.length) {
        modalContent.innerHTML = `
             <h3 class="text-lg font-bold">Invalid Search!</h3>
                <p class="py-4">
                    Please Input Your Search Issues..!
                </p>`;
        modalName.showModal();
        allIssues()
        inputField.value="";
    }else{
        searchIssues(inputValue)
        inputField.value =""
    }
});

// Search Fetch
const searchIssues = async (issues) => {
    const res = await fetch(
        `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${issues}`,
    );
    const data = await res.json();
    stopLoading();
    displayIssues(data.data);
};
