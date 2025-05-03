  const sample1 = "https://drive.google.com/file/d/1N42xb5WNrxww78nBd3d8m9QDlecsuC1A/view?usp=drive_link";
  const sample2 = "https://drive.google.com/file/d/1My_e0qVMIdT6REwew_uQdsWKi2u1Tgvx/view?usp=drive_link";
  const sample3 = "https://drive.google.com/file/d/1Me_pqTnSbU51PuNWFGVh_E1DQutrcLX5/view?usp=drive_link";

  // Match the file ID from the Google Drive links
  const fileIdMatch_sample1 = sample1.match(/\/d\/(.*?)\//);
  const fileIdMatch_sample2 = sample2.match(/\/d\/(.*?)\//);
  const fileIdMatch_sample3 = sample3.match(/\/d\/(.*?)\//);

  // If a file ID is matched, construct the image source URL
  if (fileIdMatch_sample1 && fileIdMatch_sample1[1]) {
    const fileId_sample1 = fileIdMatch_sample1[1];
    const imgSrc_fileId_sample1 = `https://drive.google.com/thumbnail?id=${fileId_sample1}&sz=w1000`;
    
    // Dynamically set the image source for sample 1
    document.getElementById('sample1-img').src = imgSrc_fileId_sample1;
  }

  if (fileIdMatch_sample2 && fileIdMatch_sample2[1]) {
    const fileId_sample2 = fileIdMatch_sample2[1];
    const imgSrc_fileId_sample2 = `https://drive.google.com/thumbnail?id=${fileId_sample2}&sz=w1000`;
    
    // Dynamically set the image source for sample 2
    document.getElementById('sample2-img').src = imgSrc_fileId_sample2;
  }

  if (fileIdMatch_sample3 && fileIdMatch_sample3[1]) {
    const fileId_sample3 = fileIdMatch_sample3[1];
    const imgSrc_fileId_sample3 = `https://drive.google.com/thumbnail?id=${fileId_sample3}&sz=w1000`;
    
    // Dynamically set the image source for sample 3
    document.getElementById('sample3-img').src = imgSrc_fileId_sample3;
  }