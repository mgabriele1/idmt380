const color_picker=document.querySelector(".colorPicker"),color_wheel=document.querySelector(".stack"),picker_close=document.querySelector(".picker-close"),picker_reflect=document.querySelector(".picker-reflect");function toggleColorPicker(){document.querySelector(".move-up")?(color_picker.classList.toggle("move-up"),picker_reflect.classList.toggle("squish"),setTimeout(function(){color_picker.classList.toggle("hide"),picker_reflect.classList.toggle("hide")},250)):hideColorPicker()}function hideColorPicker(){color_picker.classList.toggle("hide"),picker_reflect.classList.toggle("hide"),setTimeout(function(){color_picker.classList.toggle("move-up"),picker_reflect.classList.toggle("squish")},250)}function hideJustPicker(){color_picker.classList.toggle("hide"),setTimeout(function(){color_picker.classList.toggle("move-up")},250)}function reset_active_swatch(){var e=document.querySelector("[data-swatch].active");e&&e.classList.remove("active")}hideColorPicker(),picker_close.addEventListener("click",toggleColorPicker),color_wheel.addEventListener("click",()=>{reset_active_swatch(),toggleColorPicker(),color_mode="picker",picker_reflect.classList.add("active")});var colorPicker=new iro.ColorPicker(".colorPicker",{width:280,color:"rgb(255, 0, 0)",borderWidth:1,borderColor:"#fff"});colorPicker.on(["color:init","color:change"],function(e){var o=colorPicker.color.hexString;picker_reflect.style.backgroundColor=o});const swatch_container=document.querySelector(".swatches"),top_aside=document.querySelector("#top-aside"),show_all=document.querySelector("#show-all");function responsivenessCheck(){swatch_container.offsetHeight>50?swatch_container.style.justifyContent="center":swatch_container.style.justifyContent="space-between",top_aside.offsetHeight>60?top_aside.style.justifyContent="center":top_aside.style.justifyContent="space-between"}window.onresize=responsivenessCheck,responsivenessCheck();const swatches=document.querySelectorAll(".swatch[data-swatch]");swatches.forEach(e=>{e.style.backgroundColor=e.dataset.swatch,e.setAttribute("title",e.dataset.swatch),e.addEventListener("click",()=>{reset_active_swatch(),e.classList.add("active"),color_mode="swatch",new_swatch=e,hideColorPicker()})}),color_picker.addEventListener("click",()=>{color_mode="picker",reset_active_swatch()});var color_mode="picker";function choose_color(){"picker"==color_mode?color=colorPicker.color.hexString:"swatch"==color_mode&&(color=new_swatch.dataset.swatch)}color_picker.value=swatches[0].dataset.swatch,choose_color();const download_btn=document.querySelector('[data-command="download"]');function resetArtworkVar(){artwork=document.querySelector(".main-area svg")}download_btn.addEventListener("click",()=>{const e=document.querySelector(".main-area").innerHTML,o=new Blob([e.toString()]),t=document.createElement("a");t.download="My-Coloring-Book.svg",t.href=window.URL.createObjectURL(o),t.click(),t.remove()}),resetArtworkVar();const main_area=document.querySelector(".main-area");main_area.addEventListener("click",e=>{document.querySelector(".move-up")?hideJustPicker():(choose_color(),push_version(),resetArtworkVar(),e.target.style.fill=color,artwork.style.fill="black",color_picker.style.display="none !important")});let versions=[artwork.cloneNode(!0)];function push_version(){resetArtworkVar(),30==versions.length&&versions.pop();var e=artwork.cloneNode(!0);versions.unshift(e)}const undo_btn=document.querySelector('[data-command="undo"]');function undo(){resetArtworkVar(),0==versions.length?alert("There is nothing to undo!"):(artwork.remove(),main_area.appendChild(versions[0]),versions.shift())}undo_btn.addEventListener("click",undo);const upload_btn=document.querySelector('[data-command="upload"]'),upload_preview_container=document.querySelector(".upload-preview"),artwork_input=document.querySelector("input#artwork-html");upload_btn.addEventListener("click",()=>{var e=document.querySelector(".upload-preview svg");e&&e.remove(),resetArtworkVar();var o=artwork.cloneNode(!0);upload_preview_container.appendChild(o),artwork_input.value=main_area.innerHTML,toggle_upload_screen()});var upload_modal=document.querySelector(".upload-modal");const upload_reset_btn=document.querySelector('button[type="reset"]');function toggle_upload_screen(){document.querySelector(".upload-modal.opened")?(upload_modal.classList.remove("opened"),upload_modal.classList.add("closed")):(upload_modal.classList.remove("closed"),upload_modal.classList.add("opened"))}upload_reset_btn.addEventListener("click",()=>{toggle_upload_screen()});