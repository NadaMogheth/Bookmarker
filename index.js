
    var SiteNameInput = document.getElementById('Bookmarkername');
    var SiteURLInput = document.getElementById('SiteURL');
    var Bookmarkercontaner = [];
  

    if (localStorage.getItem("Bookmarkerss") !== null) {
        Bookmarkercontaner = JSON.parse(localStorage.getItem("Bookmarkerss"));
        displayBookmarker();
    }

    function submitBookmarker() {
      var siteName = SiteNameInput.value.trim();
      var siteURL = SiteURLInput.value.trim();


      if (!isValidInput(siteName, siteURL)) {
          var modal = new bootstrap.Modal(document.getElementById('rulesModal'));
          modal.show();
          return;
      }

      var Bookmarker = {
          SiteName: siteName,
          Siteurl: siteURL
      };

      Bookmarkercontaner.push(Bookmarker);
      localStorage.setItem("Bookmarkerss", JSON.stringify(Bookmarkercontaner));
      clearform();
      displayBookmarker();
  }


  function isValidInput(siteName, siteURL) {
    if (siteName.length < 3) {
        return false;
    }

    var urlPattern = /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}(\/\S*)?$/;

    if (!urlPattern.test(siteURL)) {
        return false;
    }

    return true;
}

    function clearform() {
        SiteNameInput.value = "";
        SiteURLInput.value = "";
    }

    function displayBookmarker() {
        var cartona = ``;
        for (var i = 0; i < Bookmarkercontaner.length; i++) {
            cartona += `<tr>
              <td>${i + 1}</td>
              <td>${Bookmarkercontaner[i].SiteName}</td>
              <td>
                <a href="${Bookmarkercontaner[i].Siteurl}" target="_blank">
                  <button class="btn btn-visit">
                    <i class="fa-solid fa-eye pe-2"></i> Visit
                  </button>
                </a>
              </td>
              <td>
                <button class="btn btn-delete" onclick="deleteBookmark(${i})"><i class="fa-solid fa-trash-can pe-2"></i> Delete</button>
              </td>
            </tr>`;
        }
        document.getElementById('tablecontent').innerHTML = cartona;
    }

    function deleteBookmark(index) {
        Bookmarkercontaner.splice(index, 1);
        displayBookmarker();
        localStorage.setItem("Bookmarkerss", JSON.stringify(Bookmarkercontaner));
    }


