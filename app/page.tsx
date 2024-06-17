"use client";

import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import clsx from "clsx";

let labels = {
  ALB: "Albumin Blood Test (ALB) g/L ",
  ALP: "Alkaline Phosphatase Test (ALP) IU/L",
  ALT: "Alanine Transaminase Test (ALT) U/L",
  AST: "Aspartate Transaminase Test (AST) U/L",
  BIL: "Bilirubin Blood Test (BIL) µmol/L",
  CHE: "Cholinesterase (CHE) kU/L",
  CHOL: "Cholesterol (CHOL) mmol/L",
  CREA: "Creatinine Blod Test (CREA) µmol/L",
  GGT: "Gamma-Glutamyl Transpeptidase Test (GGT) U/L",
  PROT: "Protein Blood Test (PROT) g/L",
};

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const [sex, setSex] = useState(0);
  const [age, setAge] = useState(0);
  const [ALB, setALB] = useState(0);
  const [ALP, setALP] = useState(0);
  const [ALT, setALT] = useState(0);
  const [AST, setAST] = useState(0);
  const [BIL, setBIL] = useState(0);
  const [CHE, setCHE] = useState(0);
  const [CHOL, setCHOL] = useState(0);
  const [CREA, setCREA] = useState(0);
  const [CGT, setCGT] = useState(0);
  const [PROT, setPROT] = useState(0);

  const [result, setResult] = useState("");

  const predict = async (e) => {
    e.preventDefault();

    const res = await axios.post(
      "http://127.0.0.1:8000/api/predict",
      {
        age: age,
        sex: sex,
        ALB: ALB,
        ALP: ALP,
        ALT: ALT,
        AST: AST,
        BIL: BIL,
        CHE: CHE,
        CHOL: CHOL,
        CREA: CREA,
        CGT: CGT,
        PROT: PROT,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const data = await res.data;

    setResult(data.result);
    setOpenModal(true);

    console.log(result);

    /* const values = {
      gender,
      age,
      currentSmoker,
      cigarettesPerDay,
      bpMeds,
      diabetic,
      totalCholestoral,
      systolicBloodPressure,
      diastolicBloodPressure,
      bmi,
      heartRate,
      glucose,
    };

    console.log(values); */
  };

  return (
    <main className="flex items-center justify-center h-screen relative">
      {openModal && (
        <article className=" w-full h-screen absolute z-50 bg-[#00000079] flex justify-center items-center">
          <div className=" relative w-[50%] mx-auto h-fit p-10 bg-white rounded-xl flex flex-col items-center justify-center">
            <button onClick={() => setOpenModal(false)}>
              <XCircle className=" absolute top-5 right-5" />
            </button>

            <h1>Analysis complete</h1>
            <br />
            <Button
              className={clsx(" bg-emerald-500 text-white font-medium", {
                " bg-red-500": result == "Risk of Hypertension",
              })}
            >
              {result}
            </Button>
          </div>
        </article>
      )}

      <div className=" lg:w-[50%] w-[80%] h-fit rounded-3xl border-2 p-10 ">
        <div className=" space-y-2 border-b-2 border-gray-300 pb-8">
          <h1 className=" font-semibold text-3xl">
            Hepatitis Infected Blood Model
          </h1>
          <p className=" text-gray-500">
            Prediction is done with the information below.
          </p>
        </div>

        <br />

        <form
          onSubmit={predict}
          method="POST"
          className=" grid gap-10 grid-cols-2"
        >
          <div className=" space-y-2">
            <h1 className=" font-medium ">Gender</h1>
            <Select onValueChange={(e) => setSex(Number(e))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  <SelectItem value="0">Male</SelectItem>
                  <SelectItem value="1">Female</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Age</h1>
            <Input
              onChange={(e) => setAge(Number(e.target.value))}
              placeholder="Enter your age"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Alumin Blood Test g/L</h1>
            <Input
              onChange={(e) => setALB(Number(e.target.value))}
              placeholder="Enter value"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Alkaline Phosphatase Test IU/L</h1>
            <Input
              onChange={(e) => setALP(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Alanine Transaminase Test U/L</h1>
            <Input
              onChange={(e) => setALT(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Aspartate Transaminase Test U/L</h1>
            <Input
              onChange={(e) => setAST(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Bilirubin Blood Test µmol/L</h1>
            <Input
              onChange={(e) => setBIL(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Cholinesterase kU/L</h1>
            <Input
              onChange={(e) => setCHE(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Cholesterol mmol/L</h1>
            <Input
              onChange={(e) => setCHOL(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Creatinine Blood Test µmol/L</h1>
            <Input
              onChange={(e) => setCREA(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">
              Gamma-Glutamy Transpeptidase Test U/L
            </h1>
            <Input
              onChange={(e) => setCGT(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <div className=" space-y-2">
            <h1 className=" font-medium ">Protein Blood Test</h1>
            <Input
              onChange={(e) => setPROT(Number(e.target.value))}
              placeholder="Enter amount"
            />
          </div>

          <Button type="submit">Predict</Button>
        </form>
      </div>
    </main>
  );
}
