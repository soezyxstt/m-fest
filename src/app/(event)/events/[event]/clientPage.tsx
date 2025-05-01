'use client';

import GradientText from '@/components/ui/text/gradient';
import { eventRegistrationSchema } from '@/lib/schema';
import { BrainCircuit, MoveLeft, PackageCheck, QrCode } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { title } from '@/components/ui/text/title';
import { montserrat } from '@/style/font';
import { Carousel, CarouselContent, CarouselItem, NextButton, PrevButton } from '@/components/ui/carousel';
import GradientButton from '@/components/ui/button/bg-gradient';
import { Input } from '@/components/ui/shadcnInput';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventName, EventRegInstitution } from "@prisma/client"
import { useAction } from 'next-safe-action/hooks';
import { registerEvent } from '@/app/_action/register';
import { toast } from 'sonner';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export default function ClientPage({ event, regs }: { event: string, regs: { name: string, nim: string | null, phoneNumber: string }[] }) {
  const [isDone, setIsDone] = useState(false);
  const { register, handleSubmit, watch, setValue, getValues, formState: { errors, isValid, isSubmitting } } = useForm<z.infer<typeof eventRegistrationSchema>>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      institutionType: undefined,
      nim: '',
      institutionName: undefined,
      phoneNumber: '',
      email: '',
      followIG: [],
      eventName: event.toUpperCase().replace('-', '_') as EventName,
      day1: true,
      day2: true,
    },
  });

  const { execute } = useAction(registerEvent, {
    onSuccess: () => {
      toast.success(`Congrats, ${getValues('name').split(" ")[0]}. The registration successful!`);

      setTimeout(() => {
        setIsDone(true);
      }, 2000);
    },
    onError: () => {
      toast.error('Failed to register');
    }
  })

  const [step, setStep] = useState(1);
  // const [file, setFile] = useState<File | null>(null);
  const pageLength = 3; // Example length, adjust as needed

  const onSubmit: SubmitHandler<z.infer<typeof eventRegistrationSchema>> = async (data, e) => {
    e?.preventDefault();

    execute(data);
  }

  return (
    <div className='h-screen'>

      {/* Navbar */}
      <div className='flex justify-between h-24 px-6 md:px-12 items-center py-6 fixed top-0 left-0 w-full z-10'>
        <Link
          href='/'
          className='flex gap-4 items-center text-white'
        >
          <MoveLeft size={24} />
          <title.h5 className={`font-medium ${montserrat.className} uppercase max-sm:hidden`}>
            Back
          </title.h5>
        </Link>
        <div className='flex gap-8 h-full items-center'>
          <GradientText
            className={`${montserrat.className} text-3xl md:text-5xl font-bold uppercase from-purple-500 via-blue-500 to-white`}
          >
            {event}
          </GradientText>
        </div>
      </div>

      {/* Main Content */}
      <div className='grid place-items-center text-white h-full w-full'>
        <div className='flex md:w-[80vw] items-center'>
          {/* Side Nav */}
          <div className='w-3/10 grid grid-cols-[1fr_20px] max-sm:hidden'>
            <div className='grid grid-cols-subgrid col-span-2'>
              <div className='flex gap-2 md:gap-4 items-center py-4'>
                <BrainCircuit className='text-2xl' />
                <div className='mr-6 w-max'>
                  <p className='text-sm text-muted'>Step 1</p>
                  <p className='text-lg font-medium'>What is {event}?</p>
                </div>
              </div>
              <div className='grid place-items-center w-full h-full relative'>
                <div className='w-0.5 h-full left-1/2 bg-white absolute -translate-x-1/2'></div>
                <div className='rounded-full border h-5 grid place-items-center backdrop-blur-sm w-5'>
                  &#x1F5F8;
                </div>
              </div>
            </div>

            <div className='grid grid-cols-subgrid col-span-2'>
              <div className='flex gap-2 md:gap-4 items-center py-4'>
                <QrCode className='text-2xl' />
                <div className='mr-6 w-max'>
                  <p className='text-sm text-muted'>Step 2</p>
                  <p className='text-lg font-medium'>Who are you?</p>
                </div>
              </div>
              <div className='grid place-items-center w-full h-full relative'>
                <div className='w-0.5 h-full left-1/2 bg-white absolute -translate-x-1/2'></div>
                <div className='rounded-full border h-5 grid place-items-center backdrop-blur-sm w-5'>
                  &#x1F5F8;
                </div>
              </div>
            </div>

            <div className='grid grid-cols-subgrid col-span-2'>
              <div className='flex gap-2 md:gap-4 items-center py-4'>
                <PackageCheck className='text-2xl' />
                <div className='mr-6 w-max'>
                  <p className='text-sm text-muted'>Step {pageLength}</p>
                  <p className='text-lg font-medium'>Confirm.</p>
                </div>
              </div>
              <div className='grid place-items-center w-full h-full relative'>
                <div className='w-0.5 h-full left-1/2 bg-white absolute -translate-x-1/2'></div>
                <div className='rounded-full border h-5 grid place-items-center backdrop-blur-sm w-5'>
                  &#x1F5F8;
                </div>
              </div>
            </div>
          </div>

          {/* The Actual Form */}
          {isDone ||
            <Carousel>
              <CarouselContent className='md:max-w-[60vw] max-w-[72.5vw] max-md:px-[1.25vw] flex items-center'>
                <CarouselItem>
                  <div className='md:pl-20 space-y-6'>
                    <div className='text-muted text-sm'>Step {step}</div>
                    <title.h3 className='font-medium mb-12'>
                      Welcome to the <span className='text-azure-m'>{event}</span> RSVP! We&apos;re excited you&apos;re joining us. Please <span className='text-amber-500'>confirm</span> you&apos;re ready to <span className='text-mauve-m'>register for the event</span>.
                    </title.h3>
                    <p className="">Click next button to continue</p>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className='md:pl-20 space-y-6'>
                    <div className='text-muted text-sm'>Step {step}</div>
                    <title.h3 className='text-3xl font-medium mb-12'>Please <span className="text-azure-m">fill</span> all the <span className="text-mauve-m">empty blanks</span> below.</title.h3>
                    <div className='grid grid-cols-1 gap-4'>
                      <div className="space-y-1">
                        <Input
                          {...register("name", {
                            required: "Name is required",
                            minLength: {
                              value: 3,
                              message: "Name must be at least 3 characters"
                            },
                            validate: {
                              hasFullName: value => {
                                const words = value.trim().split(/\s+/);
                                return words.length >= 2 || 'Please enter your full name (first and last name)';
                              },
                              notRegistered: value => {
                                const nameExists = regs.some(reg => reg.name === value);
                                return !nameExists || 'This name is already registered for this event';
                              }
                            }
                          })}
                          placeholder='name'
                        />
                        {errors.name && (
                          <p className="text-xs text-red-500 ml-1">
                            {errors.name.message || 'Name must be at least 3 characters with first and last name'}
                          </p>
                        )}
                      </div>
                      <Select {...register('institutionType', { minLength: 3, required: "Please select the corresponding institution type." })} onValueChange={(v) => setValue('institutionType', v as EventRegInstitution)}>
                        <SelectTrigger>
                          <SelectValue className='text-muted placeholder:text-muted' placeholder='Institution' />
                        </SelectTrigger>
                        <SelectContent className='backdrop-blur-sm bg-white/10'>
                          {Object.keys(EventRegInstitution).map((institution) => (
                            <SelectItem key={institution} value={institution} className=' text-white'>{institution}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {watch('institutionType') === 'ITB' && (
                        <div className="space-y-1">
                          <Input
                            placeholder='NIM'
                            {...register('nim', {
                              minLength: {
                                value: 8,
                                message: 'NIM must be exactly 8 characters'
                              },
                              maxLength: {
                                value: 8,
                                message: 'NIM must be exactly 8 characters'
                              },
                              validate: value => {
                                // Check if the NIM exists in regs array
                                const nimExists = regs.some(reg => reg.nim === value);
                                if (nimExists) return 'This NIM is already registered';

                                // Check if the first 3 digits are valid
                                const firstThreeDigits = value?.substring(0, 3);
                                const isValidNIM = nims.includes(firstThreeDigits!);
                                if (!isValidNIM) return 'Please enter a valid ITB NIM';

                                return true;
                              }
                            })}
                          />
                          {errors.nim && (
                            <p className="text-xs text-red-500 ml-1">
                              {errors.nim.message || 'NIM must be exactly 8 characters'}
                            </p>
                          )}
                        </div>
                      )}
                      {watch('institutionType') === 'NON_ITB' && (
                        <div className="space-y-1">
                          <Input
                            placeholder='institution name e.g Institut Teknologi Bandung'
                            {...register('institutionName', {
                              minLength: 2,
                              validate: value => {
                                if (!value) return 'Institution name is required';
                                return universities.some(uni =>
                                  uni.toLowerCase() === value.toLowerCase() ||
                                  uni.toLowerCase().includes(value.toLowerCase())
                                ) || 'Please enter a valid institution name';
                              }
                            })}
                          />
                          {errors.institutionName && (
                            <p className="text-xs text-red-500 ml-1">
                              {errors.institutionName.message || 'Institution name must be at least 3 characters'}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="space-y-1">
                        <Input
                          placeholder='email'
                          type='email'
                          {...register('email', {
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            },
                            validate: value => {
                              // Basic email format validation
                              if (!value.includes('@') || !value.includes('.')) {
                                return 'Please enter a valid email address';
                              }
                              return true;
                            }
                          })}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 ml-1">
                            {errors.email.message || 'Please enter a valid email address'}
                          </p>
                        )}
                      </div>
                      <div className="space-y-1">
                        <Input
                          placeholder='phone number'
                          type='number'
                          {...register('phoneNumber', {
                            minLength: 8,
                            maxLength: 15,
                            validate: value => {
                              // Check if the phone number exists in regs array
                              const phoneExists = regs.some(reg => reg.phoneNumber === value);
                              return !phoneExists || 'This phone number is already registered';
                            }
                          })}
                        />
                        {errors.phoneNumber && (
                          <p className="text-xs text-red-500 ml-1">
                            {errors.phoneNumber.message || 'Phone number must be between 8-15 digits'}
                          </p>
                        )}
                      </div>
                      <div className='flex max-md:flex-col md:flex md:items-center gap-2 md:gap-4'>
                        <Label className=' whitespace-nowrap text-nowrap text-muted'>Day to come: </Label>

                        <div className='flex gap-4 items-center w-full'>
                          <div className="flex gap-3 w-full border border-[#333] p-2 rounded-md shadow items-center">
                            <Checkbox id='day-1' {...register('day1')} checked={watch('day1')} onCheckedChange={(v) => {
                              setValue('day1', v as boolean);
                              if (!v) {
                                setValue('day2', true);
                              }
                            }} />
                            <Label htmlFor='day-1' className=' max-md:text-xs'>Friday, 2 May</Label>
                          </div>
                          <div className="flex gap-3 w-full border border-[#333] p-2 rounded-md shadow items-center">
                            <Checkbox id='day-2' {...register('day2')} checked={watch('day2')}
                              onCheckedChange={(v) => {
                                setValue('day2', v as boolean);
                                if (!v) {
                                  setValue('day1', true);
                                }
                              }}
                            />
                            <Label htmlFor='day-2' className=' max-md:text-xs'>Saturday, 3 May</Label>
                          </div>
                        </div>
                      </div>
                      <Input {...register('followIG')} type='file' accept='image/*' className='hidden' id='follow_ig' />
                      <label role='button' htmlFor="follow_ig" className='flex h-9 items-center w-full rounded-md border border-input bg-transparent px-3 py-1 text-xs shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-stone-400 placeholder:text-muted focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm text-muted cursor-pointer'>{!!watch('followIG')[0] ? getValues('followIG')[0].name : "screenshot of following mfestitb"}</label>
                    </div>
                  </div>
                </CarouselItem>
                <CarouselItem>
                  <div className='md:pl-20 space-y-6'>
                    <div className='text-muted text-sm'>Step {step}</div>
                    <title.h3 className='text-3xl font-medium mb-12'>Let&apos;s <span className='text-mauve-m'>rewiew</span> your answers in the step 2.</title.h3>
                    <div className="space-y-2">
                      <div className="md:grid-cols-2 grid grid-cols-1 gap-2 w-full">
                        <div className="flex justify-between items-center">
                          <p className={getValues('name') && !errors.name ? "line-through text-muted" : "text-white"}>
                            Name {getValues('name') && !errors.name ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <p className={getValues('institutionType') && !errors.institutionType ? "line-through text-muted" : "text-white"}>
                            Institution {getValues('institutionType') && !errors.institutionType ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                          </p>
                        </div>

                        {getValues('institutionType') === 'ITB' && (
                          <div className="flex justify-between items-center">
                            <p className={getValues('nim') && !errors.nim ? "line-through text-muted" : "text-white"}>
                              NIM {getValues('nim') && !errors.nim ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                            </p>
                          </div>
                        )}

                        {getValues('institutionType') === 'NON_ITB' && (
                          <div className="flex justify-between items-center">
                            <p className={getValues('institutionName') && !errors.institutionName ? "line-through text-muted" : "text-white"}>
                              Institution Name {getValues('institutionName') && !errors.institutionName ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                            </p>
                          </div>
                        )}

                        <div className="flex justify-between items-center">
                          <p className={getValues('email') && !errors.email ? "line-through text-muted" : "text-white"}>
                            Email {getValues('email') && !errors.email ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <p className={getValues('phoneNumber') && !errors.phoneNumber ? "line-through text-muted" : "text-white"}>
                            Phone Number {getValues('phoneNumber') && !errors.phoneNumber ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                          </p>
                        </div>
                      
                        <div className="flex justify-between items-center">
                          <p className={(watch('day1') || watch('day2')) ? "line-through text-muted" : "text-white"}>
                            Day to come {(watch('day1') || watch('day2')) ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                            {!(watch('day1') || watch('day2')) && <span className="text-xs text-red-500 ml-2">At least one day must be selected</span>}
                          </p>
                        </div>

                        <div className="flex justify-between items-center">
                          <p className={getValues('followIG')[0] && !errors.followIG ? "line-through text-muted" : "text-white"}>
                            Instagram Follow Proof {getValues('followIG')[0] && !errors.followIG ? <span className="text-green-500">✓</span> : <span className="text-red-500">✕</span>}
                          </p>
                        </div>
                      </div>

                      {isValid ? (
                        <div className="mt-8 text-lg">
                          <p className="text-azure-m">Thanks! You can submit the form.</p>
                        </div>
                      ) : (
                        <div className="mt-8 text-lg">
                          <p className="">Please <span className="text-amber-500">recheck</span> all required fields.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="flex w-full justify-between mt-8 md:mt-16 md:pl-20">
                <PrevButton onClick={() => {
                  setStep(step - 1);
                }} />
                {step < pageLength ? (<NextButton onClick={() => {
                  setStep(step + 1);
                }} />) : (
                  <GradientButton className='min-w-28' onClick={() => {
                    handleSubmit(onSubmit)();
                  }}
                    disabled={!isValid || isSubmitting} type='submit'
                    variant='glow'
                  >
                    Register
                  </GradientButton>
                )}
              </div>
            </Carousel>
          }

          {isDone &&
            <div className="flex flex-col items-center justify-center text-center space-y-8 md:pl-20 max-w-[60vw]">
              <title.h3 className="font-medium">
                Hi, <span className="text-azure-m">{getValues('name').split(" ")[0]}</span>.
                Thanks for registering <span className="text-mauve-m">{event}</span>.
                <br />
                May you enjoy your day at <span className="text-amber-500">Mechanical Festival 2025</span> 🎉🎉🎉!
              </title.h3>
              <Link href="/">
                <GradientButton className="min-w-28" variant='outline'>
                  Back to Home
                </GradientButton>
              </Link>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export const nims = [
  // FMIPA
  "101", "201", "301", // Matematika
  "102", "202", "302", // Fisika
  "103", "203", "303", // Astronomi
  "105", "205", "305", // Kimia
  "115", "215", "315", // Aktuaria

  // SITH
  "104", "204", "304", // Biologi (Sains)
  "112", "212", "312", // Rekayasa Hayati
  "114", "214",        // Rekayasa Pertanian
  "119",               // Rekayasa Kehutanan (S1)
  "106", "206", "306", // Mikrobiologi (Sains)
  "116", "216",        // Teknologi Pasca Panen (Rekayasa)

  // SF
  "107", "207", "307", // Sains & Tek Farmasi / Farmasi
  "116",               // Farmasi Klinik & Komunitas (S1, bisa tumpang tindih kodenya dgn SITH)

  // FTTM
  "121", "221", "321", // Teknik Pertambangan
  "122", "222", "322", // Teknik Perminyakan
  "123", "223", "323", // Teknik Geofisika
  "125", "225", "325", // Teknik Metalurgi
  "128", "228", "328", // Teknik Geothermal

  // FITB
  "120", "220", "320", // Teknik Geologi
  "129", "229", "329", // Teknik Geodesi & Geomatika
  "151", "251", "351", // Oseanografi
  "153", "253", "353", // Meteorologi

  // FTI
  "130", "230", "330", // Teknik Kimia
  "131", "231", "331", // Teknik Fisika
  "133", "233", "333", // Teknik Industri
  "137", "237", "337", // Manajemen Rekayasa
  "144", "244", "344", // Teknik Pangan
  "145", "245", "345", // Teknik Bioenergi & Kemurgi

  // FTSL
  "150", "250", "350", // Teknik Sipil
  "152", "252", "352", // Rekayasa Infrastruktur Lingkungan
  "154", "254", "354", // Teknik Lingkungan
  "155", "255", "355", // Teknik Kelautan
  "158", "258", "358", // Teknik & Pengelolaan Sumber Daya Air

  // FTMD
  "136", "236", "336", // Teknik Mesin
  "132", "232", "332", // Teknik Dirgantara (dulu Aeronautika & Astronautika)
  "135", "235", "335", // Teknik Material

  // STEI
  "134", "234", "334", // Teknik Elektro (termasuk S3 gabungan)
  "182", "282", "382", // Informatika (termasuk S3 gabungan)
  "180", "280",        // Sistem & Teknologi Informasi
  "181", "281",        // Teknik Tenaga Listrik
  "183", "283",        // Teknik Telekomunikasi
  "196", "296",        // Teknik Biomedis

  // SAPPK
  "156", "256", "356", // Arsitektur
  "157", "257", "357", // Perencanaan Wilayah & Kota

  // FSRD
  "170", "270", "370", // Seni Rupa / Visual Art and Design
  "172", "272",        // Kriya
  "173", "273",        // Desain Interior
  "174", "274",        // Desain Komunikasi Visual
  "175", "275",        // Desain Produk
  "179",               // Kewirausahaan (S1, cek asosiasi fakultas)

  // SBM
  "190", "290", "390", // Manajemen / Sains Manajemen
  "192",               // Kewirausahaan (S1)
  "291",               // MBA
  "293"                // MBA
]

export const universities = [
  "universitas indonesia",
  "UI",
  "universitas gadjah mada",
  "UGM",
  "institut teknologi bandung",
  "ITB",
  "universitas padjadjaran",
  "Unpad",
  "institut pertanian bogor",
  "IPB",
  "ipb university", // Duplikat IPB, disertakan sesuai list awal
  "IPB",
  "universitas airlangga",
  "Unair",
  "institut teknologi sepuluh nopember",
  "ITS",
  "universitas brawijaya",
  "UB",
  "universitas diponegoro",
  "Undip",
  "universitas sebelas maret",
  "UNS",
  "universitas hasanuddin",
  "Unhas",
  "universitas sumatera utara",
  "USU",
  "universitas andalas",
  "Unand",
  "universitas pendidikan indonesia",
  "UPI",
  "universitas negeri yogyakarta",
  "UNY",
  "universitas negeri malang",
  "UM",
  "universitas negeri semarang",
  "Unnes",
  "universitas syiah kuala",
  "USK",
  "universitas udayana",
  "Unud",
  "universitas lampung",
  "Unila",
  "universitas sriwijaya",
  "Unsri",
  "universitas jenderal soedirman",
  "Unsoed",
  "universitas jember",
  "Unej",
  "universitas negeri surabaya",
  "Unesa",
  "universitas negeri jakarta",
  "UNJ",
  "universitas terbuka",
  "UT",
  "universitas bina nusantara",
  "Binus",
  "universitas pelita harapan",
  "UPH",
  "universitas katolik indonesia atma jaya",
  "Unika Atma Jaya",
  "universitas trisakti",
  "Usakti",
  "universitas tarumanagara",
  "Untar",
  "universitas muhammadiyah yogyakarta",
  "UMY",
  "universitas islam indonesia",
  "UII",
  "universitas gunadarma",
  "Gundar", // Atau UG
  "universitas telkom",
  "Tel-U",
  "universitas presiden",
  "President University", // Atau PU
  "universitas negeri padang",
  "UNP",
  "universitas jambi",
  "Unja",
  "universitas sam ratulangi",
  "Unsrat",
  "universitas lambung mangkurat",
  "ULM",
  "universitas mulawarman",
  "Unmul",
  "universitas mataram",
  "Unram",
  "universitas riau",
  "Unri",
  "universitas cenderawasih",
  "Uncen",
  "universitas pattimura",
  "Unpatti",
  "universitas tanjungpura",
  "Untan",
  "universitas palangka raya",
  "UPR",
  "universitas tadulako",
  "Untad",
  "universitas halu oleo",
  "UHO",
  "universitas bengkulu",
  "Unib",
  "universitas sultan ageng tirtayasa",
  "Untirta",
  "universitas trunojoyo madura",
  "UTM",
  "universitas malikussaleh",
  "Unimal",
  "universitas negeri gorontalo",
  "UNG",
  "universitas pendidikan ganesha",
  "Undiksha",
  "universitas bangka belitung",
  "UBB",
  "universitas borneo tarakan",
  "UBT",
  "institut teknologi sumatera",
  "ITERA",
  "upn veteran jakarta",
  "UPNVJ",
  "upn veteran yogyakarta",
  "UPNVYK",
  "upn veteran jawa timur",
  "UPN Jatim",
  "universitas islam bandung",
  "Unisba",
  "universitas katolik parahyangan",
  "Unpar",
  "universitas kristen maranatha",
  "UKM", // Atau Maranatha
  "universitas pasundan",
  "Unpas",
  "universitas komputer indonesia",
  "Unikom",
  "universitas widyatama",
  "Widyatama", // Atau Utama
  "universitas ahmad dahlan",
  "UAD",
  "universitas muhammadiyah malang",
  "UMM",
  "universitas kristen satya wacana",
  "UKSW",
  "institut seni indonesia yogyakarta",
  "ISI Yogyakarta",
  "institut seni indonesia surakarta",
  "ISI Surakarta",
  "institut seni indonesia denpasar",
  "ISI Denpasar",
  "institut seni indonesia padang panjang",
  "ISI Padang Panjang",
  "institut seni budaya indonesia bandung",
  "ISBI Bandung",
  "institut seni budaya indonesia aceh",
  "ISBI Aceh",
  "universitas jenderal achmad yani",
  "Unjani",
  "universitas islam negeri sunan gunung djati",
  "UIN SGD", // Atau UIN Bandung
  "institut teknologi nasional bandung",
  "Itenas",
  "universitas islam nusantara",
  "Uninus",
  "universitas langlangbuana",
  "Unla",
  "universitas nurtanio bandung",
  "Unnur",
  "universitas advent indonesia",
  "Unai",
  "universitas nasional pasim",
  "Unas PASIM",
  "universitas sangga buana ypkp",
  "USB YPKP",
  "universitas al-ghifari",
  "Unfari",
  "universitas muhammadiyah bandung",
  "UMBandung",
  "universitas kebangsaan republik indonesia",
  "UKRI",
  "universitas informatika dan bisnis indonesia",
  "Unibi",
  "institut teknologi harapan bangsa",
  "ITHB",
  "universitas logistik dan bisnis internasional",
  "ULBI",
  "universitas bale bandung",
  "Unibba",
  "ars university",
  "ARS University",
  "international women university",
  "IWU",
  "universitas bina sarana informatika",
  "UBSI",
  "institut teknologi sains bandung",
  "ITSB",
  "universitas winaya mukti",
  "Unwim",
  "universitas teknologi digital",
  "UTDI", // Atau Digitech University
  "institut agama islam persis bandung",
  "IAI Persis",
  "politeknik negeri bandung",
  "Polban",
  "politeknik manufaktur bandung",
  "Polman Bandung",
  "politeknik pariwisata nhi bandung",
  "Poltekpar NHI", // Atau NHI Bandung
  "sekolah tinggi hukum bandung",
  "STHB",
  "sekolah tinggi ilmu ekonomi ekuitas",
  "STIE Ekuitas",
  "sekolah tinggi ilmu kesehatan immanuel bandung",
  "STIKes Immanuel",
  "sekolah tinggi ilmu kesehatan dharma husada bandung",
  "STIKes Dharma Husada",
  "sekolah tinggi ilmu kesehatan aisyiyah bandung",
  "STIKes 'Aisyiyah Bandung",
  "stkip pasundan",
  "STKIP Pasundan",
  "stmik bandung",
  "STMIK Bandung",
  "stmik lpkia bandung",
  "STMIK LPKIA",
  "sekolah tinggi ilmu administrasi bandung",
  "STIA Bandung",
  "sekolah tinggi ilmu komunikasi bandung",
  "STIKOM Bandung",
  "sekolah tinggi manajemen bandung",
  "STMB",
  "sekolah tinggi teknologi bandung",
  "STTB",
  "stie inaba",
  "STIE Inaba",
];