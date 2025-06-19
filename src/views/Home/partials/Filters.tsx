import Typography from "@aroma/components/Typography";
import { Form, Input, Select, Slider } from "antd";
import React from "react";
import { BiSearch } from "react-icons/bi";

function Filters() {
  return (
    <div className="w-full px-4 py-6">
      <Form className="gap-4 flex flex-col">
        <Input
          placeholder="Search"
          prefix={<BiSearch className="w-7 h-7 text-gray-500" />}
        />
        <div className="flex flex-col my-2">
          <Typography as="p" className="font-medium">
            Rating
          </Typography>
          <Slider min={1} step={0.1} max={5} />
        </div>
        <div className="flex gap-x-5">
          <Select
            className="w-full"
            options={[{ label: "3", value: 3.5 }]}
            placeholder="Rating"
          />
          <Select
            className="w-full"
            options={[{ label: "> 100.000", value: 3.5 }]}
            placeholder="Price"
          />
        </div>
      </Form>
    </div>
  );
}

export default Filters;
