import { useEffect, useState } from 'react';
import SoccerLoader from '../SoccerLoader';
import cryingArgetnines from '../assets/crying-argentine-fans.jpeg';
import maradona from '../assets/maradona.jpeg';
import messiFatass from '../assets/messi-fatass.jpeg';
import messiHug from '../assets/messi-hug.jpeg';
import pepe from '../assets/pepe.jpeg';
import verguenza from '../assets/verguenza.jpeg';

const imgs = [
  cryingArgetnines,
  maradona,
  messiFatass,
  messiHug,
  pepe,
  verguenza,
];

const useRndNumGen = ({ min, max }) => {
  const [rndNum, setRndNum] = useState(0);

  const generateRndNum = () => {
    min = Math.ceil(min);
    max = Math.floor(max);

    setRndNum(Math.floor(Math.random() * (max - min + 1) + min));
  };

  return { rndNum, generateRndNum };
};

const useRndNumForm = () => {
  const [range, setRange] = useState({ min: '1', max: '10' });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;

    setRange((state) => ({ ...state, [name]: value }));
  };

  return { form: range, onChange };
};

const useRndImg = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  const setRandomImg = () => {
    setSelectedImg(imgs[Math.floor(Math.random() * imgs.length)]);
  };

  return { selectedImg, setRandomImg };
};

function App() {
  const [loaded, setLoaded] = useState(true);
  const { form, onChange } = useRndNumForm();
  const { rndNum, generateRndNum } = useRndNumGen(form);
  const { selectedImg, setRandomImg } = useRndImg();

  const onSubmit = () => {
    generateRndNum();
    setRandomImg();
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoaded(true);
  //   }, 3000);
  // }, []);

  return (
    <div
      className={!loaded ? 'root root--loading' : 'root root--loaded'}
      style={
        selectedImg
          ? {
              backgroundImage: `url(${selectedImg})`,
            }
          : {}
      }
    >
      {!loaded ? (
        <SoccerLoader />
      ) : (
        <>
          {<h1 className="number">{rndNum ? rndNum : 'Boludez'}</h1>}
          <div className="inputs">
            <div className="inputs__group inputs__min-group">
              <label for="min">Min</label>
              <input
                className="input inputs__min-input"
                name="min"
                onChange={onChange}
                value={form.min}
              />
            </div>
            <div className="inputs__group inputs__max-group">
              <label>Max</label>
              <input
                className="input inputs__max-input"
                name="max"
                onChange={onChange}
                value={form.max}
              />
            </div>
          </div>
          <button className="button button--generate">
            <img
              height={100}
              width={100}
              alt="argentina flag"
              src="https://cdn.countryflags.com/thumbs/argentina/flag-round-250.png"
              onClick={onSubmit}
            />
          </button>
        </>
      )}
    </div>
  );
}

export default App;
