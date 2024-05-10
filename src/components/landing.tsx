"use client";

import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export function Landing() {
    const [repoUrl, setRepoUrl] = useState("");
    const [uploadId, setUploadId] = useState("");
    const [uploading, setUploading] = useState(false);
    const [deployed, setDeployed] = useState(false);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-xl">Deploy GitHub Repository</CardTitle>
                    <CardDescription>Enter the URL of your GitHub repository for deployment</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="github-url">GitHub Repository URL</Label>
                            <Input
                                onChange={(e) => {
                                    setRepoUrl(e.target.value);
                                }}
                                placeholder="https://github.com/user/repo"
                            />
                        </div>
                        <Button onClick={async () => {
                            setUploading(true);
                            const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, {
                                repoUrl: repoUrl
                            });
                            setUploadId(res.data.id);
                            setUploading(false);
                            setTimeout(() => {
                                setDeployed(true);
                            }, 5000);
                        }} disabled={uploadId !== "" || uploading} className="w-full" type="submit">
                            {uploadId ? `Deploying (${uploadId})` : uploading ? "Uploading..." : "Deploy"}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            {deployed && <Card className="w-full max-w-md mt-8">
                <CardHeader>
                    <CardTitle className="text-xl">Deployment Status</CardTitle>
                    <CardDescription>Your website is successfully deployed!</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="deployed-url">Deployed URL</Label>
                        <Input id="deployed-url" readOnly type="url" value={`http://${uploadId}.localhost:3001/index.html`} />
                    </div>
                    <br />
                    <Button className="w-full" variant="outline">
                        <a href={`http://${uploadId}.localhost:3001/index.html`} target="_blank">
                            Visit Website
                        </a>
                    </Button>
                </CardContent>
            </Card>}
        </main>
    )
}