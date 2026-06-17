var  navabar = document.getElementById


// ----------------------------------cart.js-------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    function updateCartTotal() {
        let cartRows = document.querySelectorAll("#cart tbody tr");
        let total = 0;

        cartRows.forEach(row => {
            let priceText = row.children[3].innerText.replace("Rs.", "").trim();
            let price = parseFloat(priceText);

            let quantity = row.querySelector("input[type='number']").value;
            let subtotal = price * quantity;

            row.children[5].innerText = "Rs. " + subtotal.toFixed(2);
            total += subtotal;
        });

        document.querySelector("#subtotal table tr:nth-child(1) td:nth-child(2)").innerText =
            "Rs. " + total.toFixed(2);

        document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)").innerText =
            "Rs. " + total.toFixed(2);
    }

    /* Quantity Change */
    document.querySelectorAll("#cart input[type='number']").forEach(input => {
        input.addEventListener("change", function () {
            if (this.value <= 0) this.value = 1;
            updateCartTotal();
        });
    });

    /* Remove Item */
    document.querySelectorAll("#cart a").forEach(removeBtn => {
        removeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            let row = this.closest("tr");
            row.style.opacity = "0";
            setTimeout(() => {
                row.remove();
                updateCartTotal();
            }, 300);
        });
    });

    /* Coupon Apply */
    const couponBtn = document.querySelector("#coupon button");
    couponBtn.addEventListener("click", function () {
        let couponInput = document.querySelector("#coupon input").value.trim();

        if (couponInput === "SAVE50") {
            alert("Coupon Applied! ₹50 Discount");
            let totalCell = document.querySelector("#subtotal table tr:nth-child(3) td:nth-child(2)");
            let total = parseFloat(totalCell.innerText.replace("Rs.", ""));
            totalCell.innerText = "Rs. " + (total - 50).toFixed(2);
        } else {
            alert("Invalid Coupon Code");
        }
    });

    updateCartTotal();
});

// ----------------------------------cart.js-------------------------------------------------