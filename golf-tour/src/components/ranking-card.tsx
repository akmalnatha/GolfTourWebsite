interface RankingCardProps {
  data: { nama: string; angkatan: string; skor: number[] }[];
  angkatan: string;
  average: number;
  rank: number
}
// [...data].sort(
//     (a, b) =>
//       a.skor.reduce((sum, score) => sum + score, 0) -
//       b.skor.reduce((sum, score) => sum + score, 0)
//   )

function RankingCard({ data, angkatan, average, rank }: RankingCardProps) {
  const totalScoreData1 = data[0]?.skor.reduce(
    (accumulator, score) => accumulator + score,
    0
  );
  const totalScoreData2 = data[1]?.skor.reduce(
    (accumulator, score) => accumulator + score,
    0
  );
  return (
    <>
      <div className="w-full h-full flex flex-col">
        <div className="bg-orange-primary flex-1 px-3 py-2 flex flex-col gap-7 justify-between ">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="headerCard-mobile xl:headerCard">{rank}</h1>
              <p className="bodyText">Rank</p>
            </div>
            <div className="flex flex-col">
              <h1 className="headerCard-mobile xl:headerCard text-right">Angkatan {angkatan}</h1>
              <p className="bodyText text-right">Group</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <>
              <div className="flex justify-between items-center">
                <p className="bodyText">{data[0].nama}</p>
                <p className="bodyText">{totalScoreData1}</p>
              </div>
              {data.length > 1 && (
                <>
                  <hr />
                  <div className="flex justify-between items-center">
                    <p className="bodyText">{data[1].nama}</p>
                    <p className="bodyText">{totalScoreData2}</p>
                  </div>
                  {data.length > 2 && (
                    <>
                      <hr />
                      <div className="flex justify-between items-center opacity-50">
                        <p className="bodyText">
                          {data.length - 2} Other(s)
                        </p>
                        <p className="bodyText">-</p>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          </div>
        </div>
        <div className="bg-orange-secondary px-3 py-2 flex justify-between">
          <p className="subCardText">Average Score</p>
          <p className="subCardText">{average}</p>
        </div>
      </div>
    </>
  );
}

export default RankingCard;
