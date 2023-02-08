function getChords(note){
    let chords = [getMajorTriad(note)];

    let quarter = Tone.Midi(note).transpose(5).toNote();
    let quinta = Tone.Midi(note).transpose(7).toNote();

    chords.push(getMajorTriad(quarter));
    chords.push(getMajorTriad(quinta))

    console.log("Accordi tonalita " + note);
    console.log(chords);

    return chords;
}

function getMajorTriad(note){
    let triad = [note];

    let terza =  Tone.Midi(note).transpose(4).toNote();
    let quinta =  Tone.Midi(terza).transpose(3).toNote();

    triad.push(terza);
    triad.push(quinta);

    return triad;
}

function getScale(note){
    let scale = [note];
    let intervals =  [2, 2, 1, 2, 2, 2, 1];

    for(let i = 0; i < 7; i++){
        scale.push(Tone.Midi(scale[i]).transpose(intervals[i]).toNote());
        console.log(intervals[i]);
    }
    console.log("Scala tonalita " + note);
    console.log(scale);
    return scale;
}

export{getChords, getScale}