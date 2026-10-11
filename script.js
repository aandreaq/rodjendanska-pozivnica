
const rsvpForm = document.getElementById("rsvpForm");

if (rsvpForm) {
    rsvpForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!rsvpForm.reportValidity()) {
            return;
        }

        const submitButton = rsvpForm.querySelector(".send-button");
        const originalText = submitButton.innerHTML;

        const data = {
            fullName: rsvpForm.elements["fullName"].value.trim(),
            phone: rsvpForm.elements["phone"].value.trim(),
            attendance: rsvpForm.elements["attendance"].value,
            note: rsvpForm.elements["note"].value.trim()
        };

        submitButton.disabled = true;
        submitButton.textContent = "SLANJE...";

        try {
            await fetch(
                "https://script.google.com/macros/s/AKfycbzhGYBbd4ytnIhWKSOoF7JLcuk2U8X3MOO2ecX0IdXppptnsFVcfxlKIug8RPVTSWo8Ng/exec",
                {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "text/plain;charset=utf-8"
                    },
                    body: JSON.stringify(data)
                }
            );

            const cocktailMenu = rsvpForm.closest(".cocktail-menu");

            cocktailMenu.innerHTML = `
                <div class="rsvp-success" role="status">
                    <span class="success-star">✦ ✧ ✦</span>
                    Vaša poruka je poslata
                </div>
            `;
        } catch (error) {
            submitButton.disabled = false;
            submitButton.innerHTML = originalText;

            alert("Slanje nije uspelo. Pokušajte ponovo.");
            console.error("Greška pri slanju RSVP formulara:", error);
        }
    });
}



const phone = document.getElementById("phone");
const ringtone = document.getElementById("ringtone");
const answerButton = document.getElementById("answerButton");
const tapMessage = document.getElementById("tap-message");


if (phone && ringtone && answerButton && tapMessage) {
    phone.addEventListener("click", async () => {
        try {
            await ringtone.play();
        } catch (error) {
            console.error("Ringtone nije mogao da se pokrene:", error);
        }

        answerButton.hidden = false;
        tapMessage.textContent = "Telefon zvoni… javi se!";

        if (navigator.vibrate) {
            navigator.vibrate([250, 100, 250]);
        }
    });

    answerButton.addEventListener("click", () => {
        ringtone.pause();
        ringtone.currentTime = 0;

        if (navigator.vibrate) {
            navigator.vibrate(0);
        }
    });
}


const madonna = document.getElementById("madonna");

if (madonna) {
    madonna.addEventListener("canplay", async () => {
        try {
            madonna.currentTime = 70;
            await madonna.play();
        } catch (error) {
            console.log("Pesma nije mogla da se pokrene:", error);
        }
    }, { once: true });

    madonna.load();
}



if (madonna) {
    let musicStarted = false;

    async function startMadonna() {
        if (musicStarted) return;

        try {
            madonna.currentTime = 70;
            await madonna.play();
            musicStarted = true;

            document.removeEventListener("pointerdown", startMadonna);
        } catch (error) {
            console.log("Čeka se dodir korisnika za pokretanje muzike.");
        }
    }

    madonna.addEventListener("loadedmetadata", startMadonna, { once: true });

    document.addEventListener("pointerdown", startMadonna);
}



