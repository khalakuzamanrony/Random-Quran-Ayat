// Function to generate a random Ayat
async function generateAyat() {
    try {
        // Step 1: Generate random Surah number (1-114)
        //const randomSurah = Math.floor(Math.random() * 114) + 1;
        const randomSurah = getRandomNumber(114)
        // Step 2: Fetch Surah details to get the total number of ayats
        const surahResponse = await fetch(`https://api.alquran.cloud/v1/surah/${randomSurah}`);
        
        const surahData = await surahResponse.json();
        const totalAyats = surahData.data.numberOfAyahs;

        // Step 3: Generate random Ayat number from the selected Surah
        //const randomAyat = Math.floor(Math.random() * totalAyats) + 1;
        const randomAyat = getRandomNumber(totalAyats);

        // Step 4: Fetch the specific Ayat with Bangla and English Tafsir
        const ayatResponse = await fetch(
            `https://api.alquran.cloud/v1/ayah/${randomSurah}:${randomAyat}/editions/quran-simple,bn.bengali,en.asad`
        );
        const ayatData = await ayatResponse.json();

        // Extract relevant Ayat data
        const arabicAyat = ayatData.data[0].text;
        const banglaTafsir = ayatData.data[1].text;
        const englishTafsir = ayatData.data[2].text;
        const surahName = surahData.data.englishName;

        // Step 5: Display Ayat in the UI
        document.getElementById('arabicAyat').textContent = arabicAyat;
        document.getElementById('banglaTafsir').textContent = banglaTafsir;
        //document.getElementById('englishTafsir').textContent = englishTafsir;
        document.getElementById('surahInfo').textContent = `${surahName}${(randomSurah)}: ${randomAyat}`;

        // document.getElementById('t1').textContent = randomSurah;
        // document.getElementById('t2').textContent = randomAyat;

    } catch (error) {
        console.error('Error fetching Ayat:', error);
        alert('Failed to fetch Ayat. Please try again.');
    }
}
function getRandomNumber(max) {
    // Ensure the input is a valid integer and greater than or equal to 1
    if (max < 1) {
        return "Please provide an integer greater than or equal to 1.";
    }
    
    // Generate a random number between 1 and max (inclusive)
    const randomNumber = Math.floor(Math.random() * max) + 1;
    
    return randomNumber;
}

// Event Listener for the Generate Button
document.getElementById('generateAyatBtn').addEventListener('click', generateAyat);

// Initial call to generate an Ayat when the page loads
generateAyat();
