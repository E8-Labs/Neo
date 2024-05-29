'use client'
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";


export default function Home() {

  const router = useRouter('');

  const handleContinueClick = () => {
    router.push('/chat')
  }

  const backgroundImage = {
    backgroundImage: 'url("../background.png")',
    backgroundSize: "cover",
    backgroundPosition: 'center',
    width: '100%',
    height: '100vh'
  }

  return (
    <div className="flex justify-center items-center" style={backgroundImage}>
      <div className="w-7/12" style={{ height: '440px', display: 'flex' }}> {/*width: '100%', maxWidth: '745px',*/}
        <div className="w-6/12" style={{ height: '100%', backgroundColor: '#001812', padding: 20 }}> {/* Remove padding when add images or slider */}
          <p style={{ fontWeight: '500', fontSize: 18, }}>
            Prompt  ai
          </p>
        </div>
        {/* Code to upload Image */}
        <div className="w-6/12" style={{ height: '100%', backgroundColor: '#000000', }}>
          <div className="flex justify-end mt-5">
            <Button variant="contained" style={{ backgroundColor: '#ffffff00', width: '20px' }}>
              <img src="../assets/cross.png" alt="Cross" style={{ height: 'auto', width: '100%', maxWidth: '20px', resize: 'cover' }} />
            </Button>
          </div>

          <div className="flex items-center justify-center" style={{ height: '90%', }}>
            <div className="flex flex-col items-center" style={{ gap: '70px' }}>
              <div>
                <Button variant="contained" className="flex items-center justify-center" style={{ height: '130px', width: '130px', backgroundColor: '#ffffff19', borderRadius: '50%' }}>
                  <img alt="AddImage" src="../assets/addImage.png" style={{ height: 'auto', width: '100%', maxWidth: '34px', resize: 'cover' }} />
                </Button>
                <Button className="font-semibold underline" style={{ color: '#00C28C', marginTop: 10 }}>
                  Upoload Photo
                </Button>
              </div>
              <div className="flex justify-center">
                <Button onClick={handleContinueClick} className="rounded font-semibold" style={{ backgroundColor: '#00C28C', color: 'white' }}>
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
