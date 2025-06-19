import { Form, Input, Button, Rate, message } from "antd";
import { db } from "@aroma/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

interface CommentFormProps {
  placeId: number;
}

function CommentForm({ placeId }: CommentFormProps) {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await addDoc(collection(db, "comments"), {
        placeId,
        name: values.name,
        comment: values.comment,
        rating: values.rating,
        createdAt: serverTimestamp(),
      });
      message.success("Comment added!");
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Failed to add comment");
    }
  };

  return (
    <div className="my-6">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Your Name"
          name="name"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Your Comment"
          name="comment"
          rules={[{ required: true, message: "Please enter your comment" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please rate" }]}
        >
          <Rate />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="bg-blue-500">
            Submit Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CommentForm;
