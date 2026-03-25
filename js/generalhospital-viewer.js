<script>
document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("panoSelect");
  const frame = document.getElementById("panoFrame");

  console.log("select:", select);
  console.log("frame:", frame);

  if (!select || !frame) return;

  select.addEventListener("change", () => {
    console.log("changed to:", select.value);
    frame.src = select.value;
  });
});
</script>