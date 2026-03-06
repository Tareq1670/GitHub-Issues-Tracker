// Name
const submitBtn = document.getElementById("sign_btn");
const userName = document.getElementById("username");
const userPass = document.getElementById("password");
const modalContent = document.getElementById("modal_content");
const modalName = document.getElementById("user_not_match");
const loginPage = document.getElementById("login_page");

// Submit Button Event
submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const userValue = userName.value;
    const passValue = userPass.value;

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
                    userName.value= ""
                    userPass.value = ""
                    loginPage.classList.add("hidden")
                }
            }
        }
    }
});
