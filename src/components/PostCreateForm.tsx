import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export function PostForm({ userData }: any) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='w-[95%] bg-white flex px-4 md:px-8 justify-between items-center py-4 rounded-lg'>
          <div className='flex gap-2 items-center'>
            <img
              src={userData?.imageUrl}
              alt='image'
              className='w-10 h-10  rounded-full'
            />
            <span className=''>Hey! How are you {userData?.firstName}?</span>
          </div>
          <Button className='shadow-xl\'>Create Post</Button>
        </div>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <Form>
            <Select label='Type' name='type'>
              <option value='recommendation'>Recommendation</option>
              <option value='request'>Request</option>
              <option value='service'>Service</option>
            </Select>

            <Input label='Media' name='media' type='url' />

            <Input label='User ID' name='user_id' type='text' />

            <Textarea label='Caption' name='caption' />

            <Input label='Tags' name='tags' type='text' />

            {/* Add any other form fields you need */}

            <button type='submit'>Submit</button>
          </Form>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
