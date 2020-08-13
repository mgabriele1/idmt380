const color_picker=document.querySelector('input[type="color"]'),color_wheel=document.querySelector(".stack");function reset_active_swatch(){var e=document.querySelector(".swatch.active");e&&e.classList.remove("active")}color_wheel.addEventListener("click",()=>{color_picker.click()});const swatches=document.querySelectorAll(".swatch");swatches.forEach(e=>{e.style.backgroundColor=e.dataset.swatch,e.setAttribute("title",e.dataset.swatch),e.addEventListener("click",()=>{reset_active_swatch(),e.classList.add("active"),color_mode="swatch",new_swatch=e})}),color_picker.addEventListener("click",()=>{color_mode="picker",reset_active_swatch()});var color_mode="picker";function choose_color(){"picker"==color_mode?color=color_picker.value:"swatch"==color_mode&&(color=new_swatch.dataset.swatch)}color_picker.setAttribute("value",swatches[0].dataset.swatch),choose_color();const main_area=document.querySelector(".main-area");let artwork=document.querySelector(".main-area svg");main_area.addEventListener("click",e=>{choose_color(),e.target.style.fill=color,push_version(),console.log("you clicked")});const download_btn=document.querySelector('[data-command="download"]');download_btn.addEventListener("click",()=>{const e=document.querySelector(".main-area").innerHTML,o=new Blob([e.toString()]),t=document.createElement("a");t.download="My-Coloring-Book.artwork",t.href=window.URL.createObjectURL(o),t.click(),t.remove()});let versions=[artwork.cloneNode(!0)];function push_version(){30==versions.length&&versions.pop();var e=artwork.cloneNode(!0);versions.unshift(e),console.log(versions.length)}const undo_btn=document.querySelector('[data-command="undo"]');undo_btn.addEventListener("click",undo);var x=0;function undo(){artwork=document.querySelector(".main-area svg"),1==versions.length?alert("There is nothing to undo!"):(artwork.remove(),versions.shift(),x+=1,main_area.appendChild(versions[0]))}const form=document.createElement("form"),input=document.createElement("input");input.setAttribute("value",artwork),main_area.appendChild(form),form.appendChild(input);