interface RankingCardProps {
  data: { nama: string; angkatan: string; skor: number[] }[];
  angkatan: string;
}

function RankingCard({ data, angkatan }: RankingCardProps) {
  const filteredData = data.filter((item) => item.angkatan == angkatan);
  const totalScoreData1 = filteredData[1]?.skor.reduce(
    (accumulator, score) => accumulator + score,
    0
  );
  const totalScoreData2 = filteredData[2]?.skor.reduce(
    (accumulator, score) => accumulator + score,
    0
  );
  const totalScore = filteredData.reduce(
    (accumulator, item) =>
      accumulator + item.skor.reduce((sum, score) => sum + score, 0),
    0
  );
  const averageScore =
    filteredData.length > 0 ? totalScore / filteredData.length : 0;
  return (
    <>
      <div className="w-full">
        <div className="bg-orange-primary px-3 py-2 flex flex-col gap-7">
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1 className="headerCard">1</h1>
              <p className="bodyText">Rank</p>
            </div>
            <div className="flex flex-col">
              <h1 className="headerCard text-right">Angkatan {angkatan}</h1>
              <p className="bodyText text-right">Group</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <>
              <div className="flex justify-between items-center">
                <p className="bodyText">{filteredData[0].nama}</p>
                <p className="bodyText">{totalScoreData1}</p>
              </div>
              {filteredData.length > 1 && (
                <>
                  <hr />
                  <div className="flex justify-between items-center">
                    <p className="bodyText">{filteredData[1].nama}</p>
                    <p className="bodyText">{totalScoreData2}</p>
                  </div>
                  {filteredData.length > 2 && (
                    <>
                      <hr />
                      <div className="flex justify-between items-center opacity-50">
                        <p className="bodyText">
                          {filteredData.length - 2} Other(s)
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
          <p className="subCardText">{averageScore}</p>
        </div>
      </div>
    </>
  );
}

export default RankingCard;
