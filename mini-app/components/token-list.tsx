"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TokenList() {
  const [token, setToken] = useState("");
  const [list, setList] = useState<string[]>([]);
  const [error, setError] = useState("");

  const addToken = () => {
    if (!token.trim()) {
      setError("Please enter a token name.");
      return;
    }
    setList((prev) => [...prev, token.trim()]);
    setToken("");
    setError("");
  };

  const removeToken = (index: number) => {
    setList((prev) => prev.filter((_, i) => i !== index));
  };

  const clearAll = () => {
    setList([]);
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Token Name"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="flex-1"
        />
        <Button onClick={addToken}>Add Token</Button>
      </div>
      {error && <p className="text-destructive">{error}</p>}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Your Buy List</h2>
        {list.length === 0 ? (
          <p className="text-muted-foreground">No tokens added.</p>
        ) : (
          <ul className="space-y-1">
            {list.map((t, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <span>{t}</span>
                <Button variant="outline" size="sm" onClick={() => removeToken(idx)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {list.length > 0 && (
        <Button variant="destructive" onClick={clearAll}>
          Clear All
        </Button>
      )}
    </div>
  );
}
