'use client'
import { useState } from 'react'
import Recent from "@/components/Recent";
import React from 'react';
import Button from "@/components/Button"

export default function Home() {
  const [file, setFile] = useState<File>()
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      return;
    }
    try {
      const data = new FormData();
      data.set('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      if (!res.ok) {
        throw new Error(await res.text());
      }
    } catch (e: any) {
      console.error(e);
    }
  }
  return (
    <>
      <h1>Choose a File/Image</h1>
        <form onSubmit={onSubmit}>
          <input
            type="file"
            name="file"
            onChange={(e) => setFile(e.target.files?.[0])}
          />
          <Button 
            type="submit"
            title="Submit"
            icon=""
            variant="btn_green"
          />
        </form>
      <Recent />
    </>
  );
}
